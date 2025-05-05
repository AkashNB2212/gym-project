import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image 
                src="/logo.svg" 
                alt="Gym Z" 
                width={120} 
                height={40} 
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Making gym equipment affordable and accessible for everyone.
            </p>
            <div className="flex space-x-4">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                <Instagram size={20} />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                <Facebook size={20} />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                <Twitter size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/1" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  Cardio Equipment
                </Link>
              </li>
              <li>
                <Link href="/category/2" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  Strength Training
                </Link>
              </li>
              <li>
                <Link href="/category/3" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  Weights & Plates
                </Link>
              </li>
              <li>
                <Link href="/category/4" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  Yoga & Fitness
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  All Categories
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  My Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/search?q=new" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  Browse Equipment
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail size={16} className="mr-2 mt-1 text-gray-500 dark:text-gray-400" />
                <a href="mailto:support@gymz.com" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  support@gymz.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone size={16} className="mr-2 mt-1 text-gray-500 dark:text-gray-400" />
                <a href="tel:+919876543210" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]">
                  +91 98765 43210
                </a>
              </li>
              <li className="mt-4">
                <Link href="/how-it-works" className="text-sm font-medium text-[#FF5A5F] hover:underline">
                  Learn How It Works →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Gym Z. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 