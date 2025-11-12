import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight, 
  Search, 
  Filter,
  RefreshCw,
  CalendarDays,
  Grid3x3,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { format, parseISO, isToday, isThisWeek, isThisMonth } from 'date-fns';
import scheduleService, { VisitSlot } from '../services/scheduleService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';

type FilterType = 'all' | 'today' | 'thisWeek' | 'thisMonth';

const Schedules: React.FC = () => {
  const navigate = useNavigate();
  
  const [allSlots, setAllSlots] = useState<VisitSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDate, setSelectedDate] = useState<string>('');

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
        const available = response.data.filter((slot: VisitSlot) => {
          const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
          return slotDateTime >= now && slot.status === 'available';
        });
        setAllSlots(available);
      }
    } catch (error) {
      console.error('Failed to load slots:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search slots
  const filteredSlots = useMemo(() => {
    let filtered = [...allSlots];

    // Apply date filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter((slot) => {
        const slotDate = parseISO(slot.date);
        switch (activeFilter) {
          case 'today':
            return isToday(slotDate);
          case 'thisWeek':
            return isThisWeek(slotDate, { weekStartsOn: 1 });
          case 'thisMonth':
            return isThisMonth(slotDate);
          default:
            return true;
        }
      });
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((slot) => {
        const dateStr = format(parseISO(slot.date), 'EEEE, MMMM d, yyyy').toLowerCase();
        const timeStr = `${slot.startTime} - ${slot.endTime}`.toLowerCase();
        return dateStr.includes(query) || timeStr.includes(query);
      });
    }

    // Apply selected date filter
    if (selectedDate) {
      filtered = filtered.filter((slot) => slot.date === selectedDate);
    }

    return filtered;
  }, [allSlots, activeFilter, searchQuery, selectedDate]);

  // Group slots by date
  const groupedSlots = useMemo(() => {
    return filteredSlots.reduce((acc, slot) => {
      const date = slot.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(slot);
      return acc;
    }, {} as Record<string, VisitSlot[]>);
  }, [filteredSlots]);

  const sortedDates = Object.keys(groupedSlots).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  const handleSlotSelect = (slot: VisitSlot) => {
    navigate(`/book/${slot.id}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setSelectedDate('');
  };

  const hasActiveFilters = searchQuery || activeFilter !== 'all' || selectedDate;

  // Get unique dates for date selector
  const uniqueDates = useMemo(() => {
    const dates = Array.from(new Set(allSlots.map(slot => slot.date))).sort();
    return dates;
  }, [allSlots]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <CalendarDays className="w-12 h-12 md:w-16 md:h-16 mr-3 animate-pulse-glow" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Available Schedules
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 mt-4 max-w-2xl mx-auto">
              Choose your preferred date and time slot to book your visit
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4 text-blue-100">
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                <span>Real-time Availability</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reminder Banner */}
        <Card className="mb-6 shadow-md border-l-4 border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50">
          <div className="p-4 flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-amber-900 mb-1">Important Reminder</h3>
              <p className="text-sm text-amber-800">
                Please <strong>double-check all information fields</strong> before submitting your booking. 
                Ensure your name, email, phone number, <strong>GCash number, and reference number are accurate and complete</strong> (both are required). 
                Incorrect information may result in booking issues or delays.
              </p>
            </div>
          </div>
        </Card>

        {/* Filters and Search Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by date or time..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900 placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-gray-700 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Quick Filters:
              </span>
              {(['all', 'today', 'thisWeek', 'thisMonth'] as FilterType[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setSelectedDate('');
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter === 'all' ? 'All Dates' : 
                   filter === 'today' ? 'Today' :
                   filter === 'thisWeek' ? 'This Week' : 'This Month'}
                </button>
              ))}
            </div>

            {/* Date Selector */}
            {uniqueDates.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Specific Date:
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setActiveFilter('all');
                  }}
                  className="w-full md:w-auto px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900"
                >
                  <option value="">All Dates</option>
                  {uniqueDates.map((date) => (
                    <option key={date} value={date}>
                      {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Active Filters Indicator */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  Showing {filteredSlots.length} of {allSlots.length} available slots
                </span>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </button>
              </div>
            )}

            {/* View Mode Toggle */}
            <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <CalendarDays className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Loading State */}
        {loading ? (
          <Card className="text-center py-16 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                <Calendar className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-gray-600 mt-6 text-lg font-medium">Loading available schedules...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we fetch the latest slots</p>
            </div>
          </Card>
        ) : filteredSlots.length === 0 ? (
          /* Empty State */
          <Card className="text-center py-16 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <Calendar className="w-20 h-20 text-gray-300" />
                <AlertCircle className="w-8 h-8 text-gray-400 absolute -bottom-2 -right-2" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {hasActiveFilters ? 'No slots match your filters' : 'No available schedules'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                {hasActiveFilters
                  ? 'Try adjusting your filters or search query to see more results.'
                  : 'We don\'t have any available slots at the moment. Please check back later for new schedules.'}
              </p>
              {hasActiveFilters ? (
                <Button onClick={clearFilters} variant="primary">
                  Clear Filters
                </Button>
              ) : (
                <Button onClick={loadSlots} variant="primary" className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              )}
            </div>
          </Card>
        ) : (
          /* Slots Display */
          <div className="space-y-6">
            {sortedDates.map((date) => {
              const dateSlots = groupedSlots[date];
              const isDateToday = isToday(parseISO(date));
              
              return (
                <Card 
                  key={date} 
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white"
                >
                  {/* Date Header */}
                  <div className={`px-6 py-5 border-b-2 ${
                    isDateToday 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CalendarDays className={`w-6 h-6 ${isDateToday ? 'text-white' : 'text-blue-600'}`} />
                        <div>
                          <h3 className={`text-xl font-bold ${isDateToday ? 'text-white' : 'text-gray-900'}`}>
                            {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
                          </h3>
                          {isDateToday && (
                            <p className="text-blue-100 text-sm mt-1">Today • {dateSlots.length} slot{dateSlots.length !== 1 ? 's' : ''} available</p>
                          )}
                        </div>
                      </div>
                      {isDateToday && (
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                          Today
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Slots Grid/List */}
                  <div className="p-6">
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {dateSlots.map((slot) => {
                          const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);
                          const isPast = slotDateTime < new Date();
                          const available = slot.capacity - slot.booked;
                          const isAvailable = !isPast && available > 0;
                          const availabilityPercent = (available / slot.capacity) * 100;
                          
                          return (
                            <button
                              key={slot.id}
                              onClick={() => isAvailable && handleSlotSelect(slot)}
                              disabled={!isAvailable}
                              className={`group relative p-5 border-2 rounded-xl text-left transition-all duration-300 ${
                                !isAvailable
                                  ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                                  : 'border-gray-200 bg-white hover:border-blue-500 hover:shadow-xl hover:scale-105 cursor-pointer transform'
                              }`}
                            >
                              {/* Availability Badge */}
                              {isAvailable && (
                                <div className="absolute top-3 right-3">
                                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                    availabilityPercent > 50 
                                      ? 'bg-green-100 text-green-700'
                                      : availabilityPercent > 25
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-orange-100 text-orange-700'
                                  }`}>
                                    {available} left
                                  </span>
                                </div>
                              )}

                              {/* Time */}
                              <div className="flex items-center space-x-2 mb-4">
                                <div className={`p-2 rounded-lg ${
                                  isAvailable ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                                }`}>
                                  <Clock className="w-5 h-5" />
                                </div>
                                <span className={`font-bold text-lg ${
                                  isAvailable ? 'text-gray-900' : 'text-gray-400'
                                }`}>
                                  {slot.startTime.substring(0, 5)} - {slot.endTime.substring(0, 5)}
                                </span>
                              </div>
                              
                              {/* Availability Info */}
                              <div className="space-y-3">
                                <div className="flex items-center text-sm">
                                  <Users className={`w-4 h-4 mr-2 ${
                                    isAvailable ? 'text-gray-600' : 'text-gray-400'
                                  }`} />
                                  <span className={isAvailable ? 'text-gray-700' : 'text-gray-400'}>
                                    <strong className="font-semibold">{available}</strong> / {slot.capacity} spots available
                                  </span>
                                </div>
                                
                                {/* Progress Bar */}
                                {isAvailable && (
                                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all ${
                                        availabilityPercent > 50 
                                          ? 'bg-green-500'
                                          : availabilityPercent > 25
                                          ? 'bg-yellow-500'
                                          : 'bg-orange-500'
                                      }`}
                                      style={{ width: `${availabilityPercent}%` }}
                                    />
                                  </div>
                                )}
                                
                                {slot.durationMinutes && (
                                  <div className={`text-xs ${
                                    isAvailable ? 'text-gray-500' : 'text-gray-400'
                                  }`}>
                                    Duration: {slot.durationMinutes} minutes
                                  </div>
                                )}
                                
                                {/* Status Badges */}
                                {isPast && (
                                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-lg">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Past slot
                                  </span>
                                )}
                                
                                {!isPast && available === 0 && (
                                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-lg">
                                    <X className="w-3 h-3 mr-1" />
                                    Fully booked
                                  </span>
                                )}
                                
                                {/* CTA */}
                                {isAvailable && (
                                  <div className="flex items-center text-blue-600 font-semibold text-sm mt-4 pt-4 border-t border-gray-200 group-hover:text-blue-700 transition-colors">
                                    <span>Book Now</span>
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      /* List View */
                      <div className="space-y-3">
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
                              className={`w-full p-5 border-2 rounded-xl text-left transition-all duration-300 ${
                                !isAvailable
                                  ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                                  : 'border-gray-200 bg-white hover:border-blue-500 hover:shadow-lg cursor-pointer'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`p-3 rounded-lg ${
                                    isAvailable ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                                  }`}>
                                    <Clock className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-3 mb-1">
                                      <span className={`font-bold text-lg ${
                                        isAvailable ? 'text-gray-900' : 'text-gray-400'
                                      }`}>
                                        {slot.startTime.substring(0, 5)} - {slot.endTime.substring(0, 5)}
                                      </span>
                                      {isAvailable && (
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                          available > slot.capacity / 2 
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-orange-100 text-orange-700'
                                        }`}>
                                          {available} spots left
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                      <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        <span>{available} / {slot.capacity} available</span>
                                      </div>
                                      {slot.durationMinutes && (
                                        <span>• {slot.durationMinutes} minutes</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {isAvailable && (
                                  <div className="flex items-center text-blue-600 font-semibold">
                                    <span>Book Now</span>
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Refresh Button */}
        {!loading && filteredSlots.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              onClick={loadSlots}
              variant="outline"
              className="flex items-center mx-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Schedules
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedules;
