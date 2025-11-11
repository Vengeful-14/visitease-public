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
  Building2,
  Users,
  Star,
  Camera,
  BookOpen
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Navbar from '../components/layout/Navbar';
import headerBannerImage from '../assets/image/Messenger_creation_61AAFF77-36C4-486F-B3FE-CF341FB19655.jpeg';
import museumImage1 from '../assets/image/Messenger_creation_00E4E278-FE62-4A0D-B5F6-2CF1153E93FF.jpeg';
import museumImage2 from '../assets/image/Messenger_creation_4D0AF6BB-7345-48B4-AD91-A82D4479885E.jpeg';
import museumImage3 from '../assets/image/Messenger_creation_4F3633FB-21A1-4544-8ED1-87E3B20242E1.jpeg';
import museumImage4 from '../assets/image/Messenger_creation_E7210B08-E71D-454A-BD7E-B010F94E3F98.jpeg';
import museumImage5 from '../assets/image/Messenger_creation_F4050C45-CA36-479C-BF12-102E4D98EBA1.jpeg';
import museumImage6 from '../assets/image/Messenger_creation_F7D3E400-B4D6-458A-8E2B-99554E4A7EDA.jpeg';
// Gallery images
import galleryImage1 from '../assets/image/Messenger_creation_11AFF312-C105-4B33-B747-F2E9A4F11BB9.jpeg';
import galleryImage2 from '../assets/image/Messenger_creation_168C0270-3472-4E5B-BD03-A2525C7106E3.jpeg';
import galleryImage3 from '../assets/image/Messenger_creation_17D92A33-2902-40E1-ACA0-CDB465BAEED5.jpeg';
import galleryImage4 from '../assets/image/Messenger_creation_22AB1796-36D2-45B4-BCDD-1985BA1D3E92.jpeg';
import galleryImage5 from '../assets/image/Messenger_creation_293C3E32-917C-45B9-ACAB-88768F8638BC.jpeg';
import galleryImage6 from '../assets/image/Messenger_creation_3712137B-B02D-4BDF-B3A7-A3A1AB28A2F7.jpeg';
import galleryImage7 from '../assets/image/Messenger_creation_38AF49EF-A316-4D45-BFBC-4E67FEC5B331.jpeg';
import galleryImage8 from '../assets/image/Messenger_creation_4019FCF0-D4EB-426C-A521-C34B89EA6E79.jpeg';
import galleryImage9 from '../assets/image/Messenger_creation_440677C2-E6A4-4DD7-BA1B-0AEC26645A32.jpeg';
import galleryImage10 from '../assets/image/Messenger_creation_44B5DFAE-3B4F-4B48-9EE1-E349ED618798.jpeg';
import galleryImage11 from '../assets/image/Messenger_creation_44E4C666-9CC3-4B1E-B452-21A15B434FFA.jpeg';
import galleryImage12 from '../assets/image/Messenger_creation_5189F6CE-4651-4A1C-A67C-EE807E65883C.jpeg';
// Plan Your Visit images
import visitImage1 from '../assets/image/Messenger_creation_51AFF94B-FFBA-4D8B-94AA-C286D8A3DFAA.jpeg';
import visitImage2 from '../assets/image/Messenger_creation_575C53FC-4C55-4BC2-AF23-E0238F5526D8.jpeg';
// Museum Features - using internet images based on content

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-white min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[85vh] overflow-hidden flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: `url(${headerBannerImage})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        />
        {/* Transparent Blue Overlay */}
        <div className="absolute inset-0 bg-blue-600 bg-opacity-60" />
        {/* Content */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 py-12 md:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white drop-shadow-2xl leading-tight">
              Welcome to Our Museum
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 max-w-3xl mx-auto text-white drop-shadow-lg px-4 leading-relaxed font-medium">
              Plan your visit with ease. Book your preferred time slot and experience our amazing collection.
            </p>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/schedules')}
              className="bg-white/90 text-blue-700 border-white hover:bg-white hover:text-blue-800 border-2"
            >
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
            {/* Museum Photo Collage */}
            <div className="relative">
              <div className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-3 rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                {/* Large image on left - spans 2 columns and 2 rows */}
                <div className="col-span-2 row-span-2 relative min-h-0">
                  <img 
                    src={museumImage1} 
                    alt="Museum exhibit" 
                    className="w-full h-full object-cover rounded-tl-lg"
                  />
                </div>
                {/* Top right small image */}
                <div className="col-span-1 row-span-1 relative min-h-0">
                  <img 
                    src={museumImage2} 
                    alt="Museum artifact" 
                    className="w-full h-full object-cover rounded-tr-lg"
                  />
                </div>
                {/* Middle right small image */}
                <div className="col-span-1 row-span-1 relative min-h-0">
                  <img 
                    src={museumImage3} 
                    alt="Museum collection" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Bottom row - three images */}
                <div className="col-span-1 row-span-1 relative min-h-0">
                  <img 
                    src={museumImage4} 
                    alt="Museum gallery" 
                    className="w-full h-full object-cover rounded-bl-lg"
                  />
                </div>
                <div className="col-span-1 row-span-1 relative min-h-0">
                  <img 
                    src={museumImage5} 
                    alt="Museum display" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-1 row-span-1 relative min-h-0">
                  <img 
                    src={museumImage6} 
                    alt="Museum exhibit" 
                    className="w-full h-full object-cover rounded-br-lg"
                  />
                </div>
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

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Museum Gallery</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our stunning collection through these captivating images. Each piece tells a unique story 
              and represents the rich cultural heritage we proudly preserve and share with visitors.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {/* Large featured image */}
            <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2 group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                <img 
                  src={galleryImage1} 
                  alt="Museum exhibit" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-semibold text-lg">Featured Collection</p>
                    <p className="text-sm opacity-90">Explore our curated exhibits</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium image */}
            <div className="sm:col-span-1 lg:col-span-1 xl:col-span-1 group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
                <img 
                  src={galleryImage2} 
                  alt="Museum artifact" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Medium image */}
            <div className="sm:col-span-1 lg:col-span-1 xl:col-span-1 group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
                <img 
                  src={galleryImage3} 
                  alt="Museum display" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Regular grid images */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img 
                  src={galleryImage4} 
                  alt="Museum gallery" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img 
                  src={galleryImage5} 
                  alt="Museum collection" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img 
                  src={galleryImage6} 
                  alt="Museum exhibit" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img 
                  src={galleryImage7} 
                  alt="Museum artifact" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Large horizontal image */}
            <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2 group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                <img 
                  src={galleryImage8} 
                  alt="Museum gallery" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-semibold text-lg">Special Exhibition</p>
                    <p className="text-sm opacity-90">Discover unique artifacts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img 
                  src={galleryImage9} 
                  alt="Museum display" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img 
                  src={galleryImage10} 
                  alt="Museum collection" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img 
                  src={galleryImage11} 
                  alt="Museum exhibit" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md aspect-square">
                <img 
                  src={galleryImage12} 
                  alt="Museum artifact" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Modern Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        {/* Floating Bubbles Background */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl animate-float"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl animate-float-reverse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl animate-float-slow" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl animate-float-reverse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl animate-float-slow" style={{ animationDelay: '2.5s' }}></div>
        </div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Location & Directions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6 lg:col-span-1">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">Ilijan, Batangas City<br />Batangas, Philippines</p>
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
              
              {/* Navigation Buttons */}
              <div className="pt-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Directions</h3>
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => {
                      window.open('https://www.google.com/maps/search/?api=1&query=Ilijan+Batangas+City+Philippines', '_blank');
                    }}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => {
                      window.open('https://waze.com/ul?q=Ilijan+Batangas+City+Philippines', '_blank');
                    }}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Open in Waze
                  </Button>
                </div>
              </div>
            </div>

            {/* Map - Wider on the right */}
            <div className="lg:col-span-2">
              <Card className="p-0 overflow-hidden">
                <div className="aspect-video w-full h-full">
                  <iframe
                    src="https://maps.google.com/maps?q=Ilijan+Batangas+City+Philippines&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Museum Location - Ilijan Batangas City"
                    className="w-full h-full"
                  />
                </div>
              </Card>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Plan Your Visit</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Check our available time slots and book your visit in advance to ensure your preferred date and time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[3/4] group">
                    <img 
                      src={visitImage1} 
                      alt="Museum visit experience" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-square group">
                    <img 
                      src={visitImage2} 
                      alt="Museum exhibits" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-square group">
                    <img 
                      src={galleryImage1} 
                      alt="Museum collection" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[3/4] group">
                    <img 
                      src={galleryImage2} 
                      alt="Museum gallery" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              <Card className="p-8 lg:p-10 border-2 border-blue-100 bg-white/80 backdrop-blur-sm shadow-xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                    <Calendar className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Available Schedules</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Browse through our available visit slots and select the time that works best for you. 
                    We offer flexible scheduling throughout the week.
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Flexible Timing</p>
                      <p className="text-gray-600 text-sm">Choose from multiple time slots daily</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-lg">
                    <Users className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Group Bookings</p>
                      <p className="text-gray-600 text-sm">Perfect for families and groups</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                    <Star className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Easy Booking</p>
                      <p className="text-gray-600 text-sm">Quick and hassle-free reservation process</p>
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  onClick={() => navigate('/schedules')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                >
                  View Available Schedules
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Museum Features Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Museum Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover what makes our museum a unique destination for culture, education, and inspiration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="p-0 overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80" 
                  alt="Historic Collections" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Historic Collections</h3>
                <p className="text-gray-600 leading-relaxed">
                  Explore our extensive collection of historical artifacts spanning multiple centuries and civilizations.
                </p>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop" 
                  alt="Art Exhibitions" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Art Exhibitions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Experience stunning artwork from renowned artists and emerging talents in our rotating galleries.
                </p>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop" 
                  alt="Educational Programs" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/80 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Educational Programs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join our educational workshops, guided tours, and interactive learning experiences.
                </p>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop&q=80" 
                  alt="Group Tours" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Group Tours</h3>
                <p className="text-gray-600 leading-relaxed">
                  Perfect for schools, organizations, and families. Book a guided group tour tailored to your needs.
                </p>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop" 
                  alt="Special Events" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Special Events</h3>
                <p className="text-gray-600 leading-relaxed">
                  Attend exclusive events, exhibitions, and cultural celebrations throughout the year.
                </p>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&h=600&fit=crop&q=80" 
                  alt="Flexible Hours" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/80 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Hours</h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer convenient visiting hours with extended evening options on weekends.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Visiting Information Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Visiting Information</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know before your visit to ensure a smooth and enjoyable experience.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 lg:p-12 border-2 border-blue-100 bg-white/90 backdrop-blur-sm shadow-xl">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Admission & Guidelines</h3>
                  <p className="text-gray-600 mt-1">Important information for your visit</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Advance Booking</p>
                    <p className="text-sm text-gray-600">Booking recommended in advance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Group Size</p>
                    <p className="text-sm text-gray-600">Up to 10 visitors per slot</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Free Admission</p>
                    <p className="text-sm text-gray-600">Children under 5 years old</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Photography</p>
                    <p className="text-sm text-gray-600">Allowed in designated areas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors md:col-span-2">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Accessibility</p>
                    <p className="text-sm text-gray-600">Wheelchair accessible facilities available</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient"></div>
        
        {/* Animated Floating Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-float opacity-60"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-white rounded-full animate-float-reverse opacity-50" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white rounded-full animate-float-slow opacity-70" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full animate-float opacity-60" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-20 right-20 w-3 h-3 bg-white rounded-full animate-float-reverse opacity-50" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Ready to Visit?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Book your visit now and secure your spot. Experience history and culture like never before.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/schedules')}
            className="!bg-white !text-blue-600 hover:!bg-gray-100 hover:!text-blue-700 font-bold text-lg px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300 !border-0"
          >
            Book Your Visit
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">VisitEase</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Your gateway to exploring history, art, and culture. Book your visit with ease and discover amazing collections.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>About Our Museum</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Collections</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Exhibitions</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Plan Your Visit</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Group Tours</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Programs</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Special Events</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Educational Programs</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Workshops</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Guided Tours</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Accessibility</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Ilijan, Batangas City<br />
                      Batangas, Philippines
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <a href="tel:+1234567890" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <a href="mailto:info@visitease.com" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                    info@visitease.com
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-400 text-sm">
                    Flexible Hours Available
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm text-center md:text-left">
                &copy; {new Date().getFullYear()} VisitEase. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
