'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side Content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Rent Premium Gym Equipment for Your Home
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Get access to professional gym equipment at affordable monthly rates. 
              No long-term commitments, delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/categories" 
                className="inline-flex items-center justify-center px-6 py-3 bg-[#FF5A5F] text-white font-medium rounded-lg hover:bg-[#E0484D] transition-colors"
              >
                Browse Equipment
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                href="/how-it-works" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                How It Works
              </Link>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex -space-x-2">
                <Image 
                  src="/images/avatar-1.jpg" 
                  alt="User avatar" 
                  width={32} 
                  height={32} 
                  className="rounded-full border-2 border-white dark:border-gray-900"
                />
                <Image 
                  src="/images/avatar-2.jpg" 
                  alt="User avatar" 
                  width={32} 
                  height={32} 
                  className="rounded-full border-2 border-white dark:border-gray-900"
                />
                <Image 
                  src="/images/avatar-3.jpg" 
                  alt="User avatar" 
                  width={32} 
                  height={32} 
                  className="rounded-full border-2 border-white dark:border-gray-900"
                />
              </div>
              <p className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">500+</span> happy customers this month
              </p>
            </div>
          </div>
          
          {/* Right Side Image */}
          <div className="w-full md:w-1/2 relative h-64 md:h-auto">
            <div className="relative z-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden h-full min-h-[320px]">
              <Image
                src="/images/hero-image.jpg"
                alt="Gym Equipment"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="text-white">
                  <p className="font-medium mb-1">Most Popular</p>
                  <h3 className="text-xl font-bold">Treadmill Fold-Up Pro</h3>
                  <p className="text-sm opacity-90">₹1,499/month</p>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-1/4 -left-4 w-24 h-24 bg-[#FF5A5F]/10 rounded-full z-0"></div>
            <div className="absolute bottom-1/4 -right-4 w-32 h-32 bg-[#00A699]/10 rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 