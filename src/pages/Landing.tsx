import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Calendar, 
  Phone, 
  Mail, 
  Globe,
  Image as ImageIcon,
  Building2,
  Users,
  Star,
  Camera,
  BookOpen
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Navbar from '../components/layout/Navbar';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Our Museum
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Plan your visit with ease. Book your preferred time slot and experience our amazing collection.
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate('/schedules')}>
              View Available Schedules
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Museum Information Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Museum Image Skeleton */}
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <ImageIcon className="w-24 h-24 text-gray-400" />
                <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                  Museum Image Placeholder
                </span>
              </div>
            </div>

            {/* Museum Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">About Our Museum</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our museum is a treasure trove of history, art, and culture. We proudly showcase 
                  an extensive collection that spans centuries, featuring artifacts, paintings, sculptures, 
                  and interactive exhibits that bring history to life.
                </p>
                <p>
                  With state-of-the-art facilities and engaging displays, we offer visitors an immersive 
                  experience that educates, inspires, and entertains. Whether you're a history enthusiast, 
                  art lover, or simply curious, there's something for everyone to discover.
                </p>
                
                {/* Museum Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">10K+</div>
                    <div className="text-sm text-gray-600">Artifacts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">Exhibitions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">50+</div>
                    <div className="text-sm text-gray-600">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Location & Directions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Skeleton */}
            <Card className="p-0 overflow-hidden">
              <div className="aspect-video bg-gray-300 flex items-center justify-center relative">
                <MapPin className="w-16 h-16 text-gray-500" />
                <span className="absolute inset-0 flex items-center justify-center text-gray-600 font-medium">
                  Interactive Map Placeholder
                </span>
              </div>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">123 Museum Street, Cultural District<br />City, State 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">info@museum.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Website</p>
                      <p className="text-gray-600">www.museum.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Plan Your Visit</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check our available time slots and book your visit in advance to ensure your preferred date and time.
            </p>
          </div>

          <Card className="p-8 text-center">
            <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Available Schedules</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Browse through our available visit slots and select the time that works best for you. 
              We offer flexible scheduling throughout the week.
            </p>
            <Button size="lg" onClick={() => navigate('/schedules')}>
              View Schedules
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Museum Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Museum Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <Building2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Historic Collections</h3>
              <p className="text-gray-600">
                Explore our extensive collection of historical artifacts spanning multiple centuries and civilizations.
              </p>
            </Card>

            <Card className="p-6">
              <Camera className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Art Exhibitions</h3>
              <p className="text-gray-600">
                Experience stunning artwork from renowned artists and emerging talents in our rotating galleries.
              </p>
            </Card>

            <Card className="p-6">
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Educational Programs</h3>
              <p className="text-gray-600">
                Join our educational workshops, guided tours, and interactive learning experiences.
              </p>
            </Card>

            <Card className="p-6">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Group Tours</h3>
              <p className="text-gray-600">
                Perfect for schools, organizations, and families. Book a guided group tour tailored to your needs.
              </p>
            </Card>

            <Card className="p-6">
              <Star className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Special Events</h3>
              <p className="text-gray-600">
                Attend exclusive events, exhibitions, and cultural celebrations throughout the year.
              </p>
            </Card>

            <Card className="p-6">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Hours</h3>
              <p className="text-gray-600">
                We offer convenient visiting hours with extended evening options on weekends.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Visiting Information Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Visiting Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Operating Hours</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>11:00 AM - 5:00 PM</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Admission & Guidelines</h3>
              <div className="space-y-2 text-gray-600">
                <p>• Advance booking recommended</p>
                <p>• Group size: Up to 10 visitors per slot</p>
                <p>• Free admission for children under 5</p>
                <p>• Photography allowed in designated areas</p>
                <p>• Wheelchair accessible facilities</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Visit?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book your visit now and secure your spot. Experience history and culture like never before.
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate('/schedules')}>
            Book Your Visit
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Museum</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>About Us</li>
                <li>Collections</li>
                <li>Exhibitions</li>
                <li>History</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Visit</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Hours & Admission</li>
                <li>Directions</li>
                <li>Parking</li>
                <li>Accessibility</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Events</li>
                <li>Education</li>
                <li>Tours</li>
                <li>Workshops</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: info@museum.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Museum Street</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} VisitEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
