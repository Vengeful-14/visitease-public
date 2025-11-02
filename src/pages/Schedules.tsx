import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import scheduleService, { VisitSlot } from '../services/scheduleService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';

const Schedules: React.FC = () => {
  const navigate = useNavigate();
  
  const [slots, setSlots] = useState<VisitSlot[]>([]);
  const [loading, setLoading] = useState(false);

  // Load available slots
  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    setLoading(true);
    try {
      const response = await scheduleService.getAvailableSlots();
      if (response.success && response.data) {
        // Filter out expired slots and past dates
        const now = new Date();
        const available = response.data.filter(slot => {
          const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
          return slotDateTime >= now && slot.status === 'available';
        });
        setSlots(available);
      }
    } catch (error) {
      console.error('Failed to load slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSlotSelect = (slot: VisitSlot) => {
    // Navigate to booking page with slot ID
    navigate(`/book/${slot.id}`);
  };

  const groupedSlots = slots.reduce((acc, slot) => {
    const date = slot.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {} as Record<string, VisitSlot[]>);

  const sortedDates = Object.keys(groupedSlots).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Schedules</h2>
          <p className="text-gray-600">Select your preferred date and time slot to proceed with booking</p>
        </div>

        {loading ? (
          <Card className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading available schedules...</p>
          </Card>
        ) : slots.length === 0 ? (
          <Card className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No available schedules at the moment.</p>
            <p className="text-sm text-gray-500">Please check back later for new available slots.</p>
            <Button variant="outline" onClick={loadSlots} className="mt-4">
              Refresh
            </Button>
          </Card>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => {
              const dateSlots = groupedSlots[date];
              return (
                <Card key={date} className="overflow-hidden">
                  <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {dateSlots.map((slot) => {
                        const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
                        const isPast = slotDateTime < new Date();
                        const available = slot.capacity - slot.booked;
                        const isAvailable = !isPast && available > 0;
                        
                        return (
                          <button
                            key={slot.id}
                            onClick={() => isAvailable && handleSlotSelect(slot)}
                            disabled={!isAvailable}
                            className={`p-5 border-2 rounded-lg text-left transition-all ${
                              !isAvailable
                                ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                                : 'border-gray-200 hover:border-blue-500 hover:shadow-lg hover:scale-105 cursor-pointer bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-gray-500" />
                                <span className="font-semibold text-gray-900">
                                  {slot.startTime.substring(0, 5)} - {slot.endTime.substring(0, 5)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <Users className="w-4 h-4 mr-2" />
                                <span>
                                  <strong className="text-gray-900">{available}</strong> / {slot.capacity} spots available
                                </span>
                              </div>
                              
                              {slot.durationMinutes && (
                                <div className="text-xs text-gray-500">
                                  Duration: {slot.durationMinutes} minutes
                                </div>
                              )}
                              
                              {isPast && (
                                <span className="inline-block px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
                                  Past slot
                                </span>
                              )}
                              
                              {!isPast && available === 0 && (
                                <span className="inline-block px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
                                  Fully booked
                                </span>
                              )}
                              
                              {isAvailable && (
                                <div className="flex items-center text-blue-600 font-medium text-sm mt-3 pt-3 border-t border-gray-200">
                                  Select this slot
                                  <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedules;

