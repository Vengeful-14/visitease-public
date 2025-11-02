import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Copy, Check } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import scheduleService, { VisitSlot } from '../services/scheduleService';
import { CreateVisitorData } from '../services/visitorService';
import bookingService from '../services/bookingService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Navbar from '../components/layout/Navbar';
import { Mail, Phone, Building, User } from 'lucide-react';
import { visitorValidator, bookingValidator, validateField } from '../utils/validation';
import Captcha from '../components/ui/Captcha';

type BookingStep = 'visitor-info' | 'confirmation';

const Book: React.FC = () => {
  const navigate = useNavigate();
  const { slotId } = useParams<{ slotId: string }>();
  
  const [step, setStep] = useState<BookingStep>('visitor-info');
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<VisitSlot | null>(null);
  
  // Visitor form state
  const [visitorData, setVisitorData] = useState<CreateVisitorData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    specialRequirements: '',
    visitorType: 'individual',
    country: 'US',
  });
  
  const [groupSize, setGroupSize] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [trackingToken, setTrackingToken] = useState<string | null>(null);
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const [tokenCopied, setTokenCopied] = useState(false);

  // Load selected slot
  useEffect(() => {
    if (slotId) {
      loadSlot(slotId);
    } else {
      navigate('/schedules');
    }
  }, [slotId, navigate]);

  const loadSlot = async (id: string) => {
    setLoading(true);
    try {
      const response = await scheduleService.getSlot(id);
      if (response.success && response.data) {
        const slot = response.data;
        const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
        const now = new Date();
        
        // Check if slot is still available
        if (slotDateTime < now || slot.status !== 'available') {
          setErrors({ slot: 'This slot is no longer available. Please select another slot.' });
          setTimeout(() => navigate('/schedules'), 3000);
        } else {
          setSelectedSlot(slot);
        }
      } else {
        setErrors({ slot: 'Slot not found.' });
        setTimeout(() => navigate('/schedules'), 3000);
      }
    } catch (error) {
      console.error('Failed to load slot:', error);
      setErrors({ slot: 'Failed to load slot details.' });
    } finally {
      setLoading(false);
    }
  };

  const validateVisitorInfo = (): boolean => {
    // Validate visitor data
    const visitorErrors = visitorValidator.validateVisitorData({
      name: visitorData.name,
      email: visitorData.email,
      phone: visitorData.phone,
      organization: visitorData.organization,
      specialRequirements: visitorData.specialRequirements,
      visitorType: visitorData.visitorType,
      country: visitorData.country,
    });

    // Validate booking data
    const bookingErrors = selectedSlot
      ? bookingValidator.validateBookingData({
          groupSize,
          slotCapacity: selectedSlot.capacity,
          slotBooked: selectedSlot.booked,
        })
      : {};

    const newErrors = { ...visitorErrors, ...bookingErrors };
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: string, value: any) => {
    // Update the field value
    if (field === 'groupSize') {
      const numValue = parseInt(value) || 0;
      setGroupSize(numValue);
      // Validate group size immediately
      if (selectedSlot) {
        const error = bookingValidator.validateGroupSize(
          numValue,
          selectedSlot.capacity,
          selectedSlot.booked
        );
        setErrors(prev => {
          if (error) {
            return { ...prev, groupSize: error };
          }
          const { groupSize: _, ...rest } = prev;
          return rest;
        });
      }
    } else {
      const updatedData = { ...visitorData, [field]: value };
      setVisitorData(updatedData);
      
      // Validate field on change
      const error = validateField(
        field as any,
        value,
        selectedSlot
          ? {
              ...updatedData,
              groupSize,
              slotCapacity: selectedSlot.capacity,
              slotBooked: selectedSlot.booked,
            }
          : updatedData
      );
      
      setErrors(prev => {
        if (error) {
          return { ...prev, [field]: error };
        }
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleFieldBlur = (field: string, value: any) => {
    // Re-validate on blur to ensure accuracy
    handleFieldChange(field, value);
  };

  const handleSubmitBooking = async () => {
    if (!validateVisitorInfo() || !selectedSlot) return;
    
    // Verify captcha before submission
    if (!captchaVerified) {
      setErrors(prev => ({ ...prev, captcha: 'Please complete the security verification' }));
      return;
    }
    
    setLoading(true);
    try {
      // Check availability first
      const availability = await bookingService.checkAvailability(selectedSlot.id, groupSize);
      if (!availability.success) {
        setErrors({ 
          groupSize: availability.error || 'Failed to check availability. Please try again.' 
        });
        setLoading(false);
        return;
      }
      
      if (!availability.data?.canAccommodate) {
        const remaining = availability.data?.remaining ?? 0;
        setErrors({ 
          groupSize: `Not enough spots available. Only ${remaining} spots remaining. Please adjust your group size or select another slot.` 
        });
        setLoading(false);
        return;
      }

      // Create booking with visitor data (public endpoint handles visitor creation)
      const bookingResponse = await bookingService.createBooking({
        slotId: selectedSlot.id,
        visitor: {
          name: visitorData.name,
          email: visitorData.email,
          phone: visitorData.phone || undefined,
          organization: visitorData.organization || undefined,
          visitorType: visitorData.visitorType || undefined,
          specialRequirements: visitorData.specialRequirements || undefined,
          country: visitorData.country || 'US',
        },
        groupSize,
        specialRequests: visitorData.specialRequirements || undefined,
      });

      if (bookingResponse.success && bookingResponse.data) {
        setBookingId(bookingResponse.data.id);
        setBookingSuccess(true);
        // Store tracking token
        if (bookingResponse.data.trackingToken) {
          setTrackingToken(bookingResponse.data.trackingToken);
        }
        setStep('confirmation');
      } else {
        setErrors({ submit: bookingResponse.error || 'Failed to create booking' });
      }
    } catch (error) {
      console.error('Booking error:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !selectedSlot) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading slot details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (errors.slot || !selectedSlot) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-12">
            <p className="text-red-600 mb-4">{errors.slot || 'Slot not available'}</p>
            <p className="text-gray-600 mb-6">Redirecting to schedules...</p>
            <Button onClick={() => navigate('/schedules')}>
              Go to Schedules
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step === 'visitor-info' ? 'text-blue-600' : 'text-green-600'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'visitor-info' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Visitor Info</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className={`flex items-center ${step === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Confirm</span>
            </div>
          </div>
        </div>

        {/* Step 1: Visitor Info */}
        {step === 'visitor-info' && (
          <Card>
            <div className="mb-6 pb-4 border-b">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Booking</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Selected Slot:</strong> {format(parseISO(selectedSlot.date), 'EEEE, MMMM d, yyyy')} at{' '}
                  {selectedSlot.startTime.substring(0, 5)} - {selectedSlot.endTime.substring(0, 5)}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Available:</strong> {selectedSlot.capacity - selectedSlot.booked} spots
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                label="Full Name *"
                value={visitorData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                onBlur={(e) => handleFieldBlur('name', e.target.value)}
                error={errors.name}
                leftIcon={<User className="w-5 h-5" />}
                required
                maxLength={255}
              />

              <Input
                label="Email Address *"
                type="email"
                value={visitorData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={(e) => handleFieldBlur('email', e.target.value)}
                error={errors.email}
                leftIcon={<Mail className="w-5 h-5" />}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                value={visitorData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                error={errors.phone}
                leftIcon={<Phone className="w-5 h-5" />}
                maxLength={20}
                helperText="Optional - Format: +1 (555) 123-4567"
              />

              <Select
                label="Visitor Type"
                value={visitorData.visitorType}
                onChange={(e) => handleFieldChange('visitorType', e.target.value)}
                error={errors.visitorType}
                options={[
                  { value: 'individual', label: 'Individual' },
                  { value: 'family', label: 'Family' },
                  { value: 'educational', label: 'Educational Group' },
                  { value: 'corporate', label: 'Corporate' },
                  { value: 'group', label: 'Group' },
                  { value: 'senior', label: 'Senior' },
                ]}
              />

              <Input
                label="Organization (Optional)"
                value={visitorData.organization}
                onChange={(e) => handleFieldChange('organization', e.target.value)}
                onBlur={(e) => handleFieldBlur('organization', e.target.value)}
                error={errors.organization}
                leftIcon={<Building className="w-5 h-5" />}
                maxLength={255}
                helperText="Maximum 255 characters"
              />

              <Input
                label="Group Size *"
                type="number"
                min="1"
                max={selectedSlot.capacity - selectedSlot.booked}
                value={groupSize.toString()}
                onChange={(e) => handleFieldChange('groupSize', e.target.value)}
                onBlur={(e) => handleFieldBlur('groupSize', e.target.value)}
                error={errors.groupSize}
                helperText={`Maximum ${selectedSlot.capacity - selectedSlot.booked} people (capacity: ${selectedSlot.capacity}, booked: ${selectedSlot.booked})`}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.specialRequirements ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                  }`}
                  rows={3}
                  value={visitorData.specialRequirements}
                  onChange={(e) => handleFieldChange('specialRequirements', e.target.value)}
                  onBlur={(e) => handleFieldBlur('specialRequirements', e.target.value)}
                  placeholder="Any special requirements or accessibility needs..."
                  maxLength={1000}
                />
                {errors.specialRequirements && (
                  <p className="mt-1 text-sm text-red-600">{errors.specialRequirements}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {visitorData.specialRequirements?.length || 0} / 1000 characters
                </p>
              </div>

              {/* Captcha Verification */}
              <Captcha
                onVerify={(isValid) => {
                  setCaptchaVerified(isValid);
                  if (isValid) {
                    setErrors(prev => {
                      const { captcha: _, ...rest } = prev;
                      return rest;
                    });
                  }
                }}
                error={errors.captcha}
              />

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <Button variant="outline" onClick={() => navigate('/schedules')}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitBooking} 
                  loading={loading}
                  disabled={!captchaVerified || loading || !!errors.groupSize}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Confirmation */}
        {step === 'confirmation' && bookingSuccess && selectedSlot && (
          <Card className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your visit has been successfully booked. We will send you an SMS with booking status updates and approval notifications.
            </p>
            
            {/* Tracking Token */}
            {trackingToken && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
                <p className="text-sm font-semibold text-blue-900 mb-3">Your Tracking Token</p>
                <p className="text-xs text-blue-700 mb-4">
                  Use this token along with your email to track your booking status. Save this token now - it won't be shown again!
                </p>
                <div className="flex items-center justify-center space-x-3 bg-white rounded-lg p-4 border-2 border-blue-300">
                  <code className="flex-1 text-xl font-bold text-blue-900 tracking-wider text-center">
                    {trackingToken}
                  </code>
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(trackingToken);
                        setTokenCopied(true);
                        setTimeout(() => setTokenCopied(false), 2000);
                      } catch (err) {
                        console.error('Failed to copy:', err);
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    title="Copy token"
                  >
                    {tokenCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{format(parseISO(selectedSlot.date), 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">
                    {selectedSlot.startTime.substring(0, 5)} - {selectedSlot.endTime.substring(0, 5)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Group Size:</span>
                  <span className="font-medium">{groupSize} {groupSize === 1 ? 'person' : 'people'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visitor:</span>
                  <span className="font-medium">{visitorData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{visitorData.email}</span>
                </div>
                {bookingId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-mono font-medium text-xs">{bookingId.substring(0, 8)}...</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-sm text-yellow-800">
                <strong>Remember:</strong> Use your tracking token along with your email address to check your booking status anytime on our tracking page.
              </p>
            </div>

            <div className="space-x-4">
              <Button onClick={() => navigate('/')}>
                Return to Home
              </Button>
              <Button variant="outline" onClick={() => {
                setStep('visitor-info');
                setSelectedSlot(null);
                setBookingSuccess(false);
                setVisitorData({
                  name: '',
                  email: '',
                  phone: '',
                  organization: '',
                  specialRequirements: '',
                  visitorType: 'individual',
                  country: 'US',
                });
                setGroupSize(1);
                setCaptchaVerified(false);
                setErrors({});
                if (slotId) {
                  loadSlot(slotId);
                } else {
                  navigate('/schedules');
                }
              }}>
                Book Another Visit
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Book;
