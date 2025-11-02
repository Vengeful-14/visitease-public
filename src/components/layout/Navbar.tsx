import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Home, Clock, Menu, X, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">VisitEase</h1>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => handleNavigation('/')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => handleNavigation('/schedules')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                isActive('/schedules')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Schedules</span>
            </button>
            <button
              onClick={() => handleNavigation('/track')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                isActive('/track')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Track</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-1 pt-4">
              <button
                onClick={() => handleNavigation('/')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 text-left ${
                  isActive('/') && location.pathname === '/'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavigation('/schedules')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 text-left ${
                  isActive('/schedules')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Schedules</span>
              </button>
              <button
                onClick={() => handleNavigation('/track')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 text-left ${
                  isActive('/track')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Track</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

