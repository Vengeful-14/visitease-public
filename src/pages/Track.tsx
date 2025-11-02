import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mail, Key, Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import bookingService from '../services/bookingService';
import { useToast } from '../contexts/ToastContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Navbar from '../components/layout/Navbar';

const Track: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState<any>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !token) {
      setError('Please enter both email and tracking token');
      return;
    }

    setLoading(true);
    setError('');
    setBooking(null);

    try {
      const response = await bookingService.trackBooking(email, token);
      
      if (response.success && response.data) {
        setBooking(response.data);
      } else {
        setError(response.error || 'Booking not found. Please check your email and tracking token.');
      }
    } catch (err) {
      console.error('Tracking error:', err);
      setError('An error occurred while tracking your booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'tentative':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'no_show':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) {
      setCancelError('Please provide a reason for cancellation');
      return;
    }

    if (!email || !token || !booking) {
      setCancelError('Missing booking information');
      return;
    }

    setCancelling(true);
    setCancelError('');

    try {
      const response = await bookingService.cancelBooking(email, token, cancelReason);
      
      if (response.success && response.data) {
        setBooking(response.data);
        setIsCancelModalOpen(false);
        setCancelReason('');
        setError('');
        showSuccess(
          'Booking Cancelled',
          'Your booking has been successfully cancelled. You will receive a confirmation email shortly. Please reload the page to see the updated status.'
        );
      } else {
        const errorMessage = response.error || 'Failed to cancel booking';
        setCancelError(errorMessage);
        showError('Cancellation Failed', errorMessage);
      }
    } catch (err) {
      console.error('Cancel booking error:', err);
      const errorMessage = 'An error occurred while cancelling your booking. Please try again.';
      setCancelError(errorMessage);
      showError('Cancellation Failed', errorMessage);
    } finally {
      setCancelling(false);
    }
  };

  const canCancelBooking = () => {
    if (!booking) return false;
    const status = booking.status?.toLowerCase();
    return status !== 'cancelled' && status !== 'completed';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Booking</h1>
          <p className="text-gray-600">
            Enter your email and tracking token to view your booking status
          </p>
        </div>

        <Card>
          <form onSubmit={handleTrack} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-5 h-5" />}
              placeholder="your.email@example.com"
              required
            />

            <Input
              label="Tracking Token"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value.toUpperCase())}
              leftIcon={<Key className="w-5 h-5" />}
              placeholder="Enter your 12-character tracking token"
              required
              maxLength={50}
              helperText="Enter the tracking token you received after booking"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              <Search className="w-5 h-5 mr-2" />
              Track Booking
            </Button>
          </form>
        </Card>

        {booking && (
          <Card className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${getStatusColor(booking.status)}`}>
                {getStatusIcon(booking.status)}
                <span className="font-semibold capitalize">{booking.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Slot Information */}
              {booking.slot && (
                <>
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-gray-900">
                        {format(parseISO(booking.slot.date), 'EEEE, MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-semibold text-gray-900">
                        {booking.slot.startTime?.substring(0, 5)} - {booking.slot.endTime?.substring(0, 5)}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Visitor Information */}
              {booking.visitor && (
                <>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Visitor Name</p>
                    <p className="font-semibold text-gray-900">{booking.visitor.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{booking.visitor.email}</p>
                  </div>

                  {booking.visitor.phone && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <p className="font-semibold text-gray-900">{booking.visitor.phone}</p>
                    </div>
                  )}

                  {booking.visitor.organization && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Organization</p>
                      <p className="font-semibold text-gray-900">{booking.visitor.organization}</p>
                    </div>
                  )}
                </>
              )}

              {/* Booking Information */}
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Group Size</p>
                  <p className="font-semibold text-gray-900">
                    {booking.groupSize} {booking.groupSize === 1 ? 'person' : 'people'}
                  </p>
                </div>
              </div>

              {booking.specialRequests && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Special Requests</p>
                  <p className="font-semibold text-gray-900">{booking.specialRequests}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600 mb-1">Booking Created</p>
                <p className="font-semibold text-gray-900">
                  {format(parseISO(booking.createdAt), 'MMM d, yyyy h:mm a')}
                </p>
              </div>

              {booking.confirmedAt && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Confirmed At</p>
                  <p className="font-semibold text-gray-900">
                    {format(parseISO(booking.confirmedAt), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              )}

              {booking.cancelledAt && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Cancelled At</p>
                  <p className="font-semibold text-gray-900">
                    {format(parseISO(booking.cancelledAt), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              )}
            </div>

            {booking.slot?.description && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-1">Slot Description</p>
                <p className="text-gray-900">{booking.slot.description}</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You will receive SMS notifications about your booking status and any approvals.
                  Please ensure your phone number is up to date.
                </p>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              {canCancelBooking() && (
                <Button 
                  variant="outline" 
                  onClick={() => setIsConfirmDialogOpen(true)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel Booking
                </Button>
              )}
              <Button variant="outline" onClick={() => navigate('/schedules')}>
                Book Another Visit
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Return to Home
              </Button>
            </div>
          </Card>
        )}

        {/* Confirmation Dialog - First Warning */}
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onClose={() => setIsConfirmDialogOpen(false)}
          onConfirm={() => {
            setIsConfirmDialogOpen(false);
            setIsCancelModalOpen(true);
          }}
          title="Cancel Booking Warning"
          message={`⚠️ Are you sure you want to cancel this booking?\n\nThis action cannot be undone. Once cancelled:\n• Your booking slot will be released\n• You'll need to book again if you want to reschedule\n• A cancellation email will be sent to your registered email address\n\nPlease consider carefully before proceeding.`}
          confirmText="Yes, I want to cancel"
          cancelText="Keep My Booking"
          variant="warning"
        />

        {/* Cancel Booking Modal */}
        <Modal
          isOpen={isCancelModalOpen}
          onClose={() => {
            setIsCancelModalOpen(false);
            setCancelReason('');
            setCancelError('');
          }}
          title="Cancel Booking"
        >
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Cancellation <span className="text-red-500">*</span>
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => {
                  setCancelReason(e.target.value);
                  setCancelError('');
                }}
                placeholder="Please provide a reason for cancelling this booking..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows={4}
                required
              />
              {cancelError && (
                <p className="mt-2 text-sm text-red-600">{cancelError}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setCancelReason('');
                  setCancelError('');
                }}
                disabled={cancelling}
              >
                Keep Booking
              </Button>
              <Button
                onClick={handleCancelBooking}
                disabled={cancelling || !cancelReason.trim()}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Track;

