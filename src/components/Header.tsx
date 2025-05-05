'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Search, Heart, ShoppingCart, Menu, X, ChevronRight, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRouter } from 'next/navigation';

// List of sample cities
const cities = [
  { id: 'delhi', name: 'Delhi' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'bangalore', name: 'Bangalore' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'chennai', name: 'Chennai' },
  { id: 'kolkata', name: 'Kolkata' },
  { id: 'pune', name: 'Pune' },
  { id: 'ahmedabad', name: 'Ahmedabad' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Delhi');
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLocationSelect = (cityName: string) => {
    setSelectedLocation(cityName);
    setIsLocationModalOpen(false);
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-sm z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex-1 flex justify-start md:justify-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Gym Z" 
                width={120} 
                height={40} 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            <button 
              className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-[#FF5A5F]"
              onClick={() => setIsLocationModalOpen(true)}
            >
              <MapPin size={20} className="mr-1" />
              <span className="hidden md:inline">{selectedLocation}</span>
            </button>
            <Link href="/wishlist" className="text-gray-700 dark:text-gray-300 hover:text-[#FF5A5F] relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF5A5F] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="text-gray-700 dark:text-gray-300 hover:text-[#FF5A5F] relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF5A5F] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            <Link href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-[#FF5A5F]">
              <User size={20} />
            </Link>
          </div>
        </div>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-3 flex">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for gym equipment..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <button 
              type="submit"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#FF5A5F]"
            >
              <Search size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <nav className="flex flex-col py-3">
            <Link 
              href="/" 
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/categories" 
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              href="/wishlist" 
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link 
              href="/cart" 
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </Link>
            <Link 
              href="/profile" 
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              My Profile
            </Link>
          </nav>
        </div>
      )}

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Select Your Location</h2>
                <button 
                  onClick={() => setIsLocationModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* City List */}
            <div className="py-2 max-h-96 overflow-y-auto">
              {cities.map(city => (
                <button
                  key={city.id}
                  onClick={() => handleLocationSelect(city.name)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <MapPin size={18} className="text-[#FF5A5F] mr-3" />
                    <span className="text-gray-800 dark:text-gray-200">{city.name}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Delivery available in selected cities only
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 