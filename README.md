# VisitEase Public - Booking Portal

A public-facing React application for visitors to book museum visits without authentication.

## Features

- **Public Landing Page**: Attractive landing page with features and booking CTA
- **Easy Booking Flow**: 
  - Select available time slots
  - Fill visitor information
  - Confirm booking
- **No Authentication Required**: Public users can book directly
- **Real-time Availability**: Shows only available slots

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will run on `http://localhost:5173` (default Vite port).

### Build

```bash
npm run build
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:3000
```

## Project Structure

```
src/
  components/
    ui/          # Reusable UI components (Card, Button, Input, Select)
  config/
    api.ts       # API configuration
  pages/
    Landing.tsx  # Landing page
    Book.tsx     # Booking flow
  services/
    baseApi.ts           # Base API service (no auth)
    scheduleService.ts   # Schedule/Slot API
    visitorService.ts    # Visitor API
    bookingService.ts    # Booking API
```

## API Integration

The app connects to the VisitEase backend API for:
- Fetching available visit slots
- Creating visitor records
- Creating bookings
- Checking slot availability

All API calls are made without authentication tokens (public access).

## Routes

- `/` - Landing page
- `/book` - Booking flow (select slot → visitor info → confirmation)

