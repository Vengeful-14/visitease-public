// Validation utilities matching backend schema and validators

export interface ValidationError {
  field: string;
  message: string;
}

export interface VisitorValidationData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  specialRequirements?: string;
  visitorType?: string;
  country?: string;
}

export interface BookingValidationData {
  groupSize: number;
  slotCapacity: number;
  slotBooked: number;
}

// Email validation regex (matches backend)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const visitorValidator = {
  // Validate name
  validateName(name: string): string | null {
    if (!name || name.trim().length === 0) {
      return 'Name is required';
    }
    if (name.trim().length > 255) {
      return 'Name must not exceed 255 characters';
    }
    if (name.trim().length < 1) {
      return 'Name must be at least 1 character';
    }
    return null;
  },

  // Validate email
  validateEmail(email: string): string | null {
    if (!email || email.trim().length === 0) {
      return 'Email is required';
    }
    if (!EMAIL_REGEX.test(email)) {
      return 'Email must be a valid email address';
    }
    // Email normalization is handled by backend
    return null;
  },

  // Validate phone (optional)
  validatePhone(phone: string | undefined): string | null {
    if (!phone || phone.trim().length === 0) {
      return null; // Phone is optional
    }
    if (phone.length > 20) {
      return 'Phone number must not exceed 20 characters';
    }
    // Basic phone validation - backend uses isMobilePhone('any') which is more lenient
    // For frontend, we'll do basic format check
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    if (cleaned.length < 7 || cleaned.length > 15) {
      return 'Phone number format is invalid';
    }
    return null;
  },

  // Validate organization (optional)
  validateOrganization(organization: string | undefined): string | null {
    if (!organization || organization.trim().length === 0) {
      return null; // Organization is optional
    }
    if (organization.trim().length > 255) {
      return 'Organization must not exceed 255 characters';
    }
    return null;
  },

  // Validate special requirements (optional)
  validateSpecialRequirements(specialRequirements: string | undefined): string | null {
    if (!specialRequirements || specialRequirements.trim().length === 0) {
      return null; // Special requirements is optional
    }
    if (specialRequirements.length > 1000) {
      return 'Special requirements must not exceed 1000 characters';
    }
    return null;
  },

  // Validate visitor type
  validateVisitorType(visitorType: string | undefined): string | null {
    const validTypes = ['individual', 'family', 'group', 'educational', 'corporate', 'senior'];
    if (!visitorType) {
      return null; // Will default to 'individual' in backend
    }
    if (!validTypes.includes(visitorType)) {
      return `Visitor type must be one of: ${validTypes.join(', ')}`;
    }
    return null;
  },

  // Validate country
  validateCountry(country: string | undefined): string | null {
    if (!country || country.trim().length === 0) {
      return null; // Will default to 'US' in backend
    }
    if (country.trim().length > 100) {
      return 'Country must not exceed 100 characters';
    }
    return null;
  },

  // Validate all visitor data
  validateVisitorData(data: VisitorValidationData): Record<string, string> {
    const errors: Record<string, string> = {};

    const nameError = this.validateName(data.name);
    if (nameError) errors.name = nameError;

    const emailError = this.validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const phoneError = this.validatePhone(data.phone);
    if (phoneError) errors.phone = phoneError;

    const orgError = this.validateOrganization(data.organization);
    if (orgError) errors.organization = orgError;

    const specialReqError = this.validateSpecialRequirements(data.specialRequirements);
    if (specialReqError) errors.specialRequirements = specialReqError;

    const visitorTypeError = this.validateVisitorType(data.visitorType);
    if (visitorTypeError) errors.visitorType = visitorTypeError;

    const countryError = this.validateCountry(data.country);
    if (countryError) errors.country = countryError;

    return errors;
  },
};

export const bookingValidator = {
  // Validate group size
  validateGroupSize(groupSize: number, slotCapacity: number, slotBooked: number): string | null {
    if (!groupSize || groupSize < 1) {
      return 'Group size must be at least 1';
    }
    
    if (!Number.isInteger(groupSize)) {
      return 'Group size must be a whole number';
    }

    const available = slotCapacity - slotBooked;
    
    // If group size is greater than available slots, it is NOT valid - show error
    if (groupSize > available) {
      return `Invalid: Group size (${groupSize}) exceeds available spots (${available}). Only ${available} spots are available.`;
    }

    if (groupSize > slotCapacity) {
      return `Invalid: Group size (${groupSize}) exceeds slot capacity (${slotCapacity})`;
    }

    // If group size is valid (<= available), return null (no error)
    return null;
  },

  // Validate booking data
  validateBookingData(data: BookingValidationData): Record<string, string> {
    const errors: Record<string, string> = {};

    const groupSizeError = this.validateGroupSize(
      data.groupSize,
      data.slotCapacity,
      data.slotBooked
    );
    if (groupSizeError) errors.groupSize = groupSizeError;

    return errors;
  },
};

// Helper to validate on blur/change
export const validateField = (
  field: keyof VisitorValidationData | 'groupSize',
  value: any,
  allData?: Partial<VisitorValidationData & BookingValidationData>
): string | null => {
  switch (field) {
    case 'name':
      return visitorValidator.validateName(value);
    case 'email':
      return visitorValidator.validateEmail(value);
    case 'phone':
      return visitorValidator.validatePhone(value);
    case 'organization':
      return visitorValidator.validateOrganization(value);
    case 'specialRequirements':
      return visitorValidator.validateSpecialRequirements(value);
    case 'visitorType':
      return visitorValidator.validateVisitorType(value);
    case 'country':
      return visitorValidator.validateCountry(value);
    case 'groupSize':
      if (allData && 'slotCapacity' in allData && 'slotBooked' in allData) {
        return bookingValidator.validateGroupSize(
          value,
          allData.slotCapacity as number,
          allData.slotBooked as number
        );
      }
      return bookingValidator.validateGroupSize(value, 999, 0); // Fallback validation
    default:
      return null;
  }
};

