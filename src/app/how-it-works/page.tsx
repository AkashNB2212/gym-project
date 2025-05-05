'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Search, Box, Truck, Calendar, CreditCard, Phone, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-8 w-8 text-[#FF5A5F]" />,
    title: "Browse & Select",
    description: "Browse our wide range of gym equipment and select what fits your needs."
  },
  {
    icon: <Calendar className="h-8 w-8 text-[#FF5A5F]" />,
    title: "Choose Rental Duration",
    description: "Select how long you need the equipment, from a week to several months."
  },
  {
    icon: <CreditCard className="h-8 w-8 text-[#FF5A5F]" />,
    title: "Secure Payment",
    description: "Pay securely online using multiple payment options."
  },
  {
    icon: <Truck className="h-8 w-8 text-[#FF5A5F]" />,
    title: "Fast Delivery",
    description: "Get your equipment delivered to your doorstep within 2-5 days."
  },
  {
    icon: <Box className="h-8 w-8 text-[#FF5A5F]" />,
    title: "Use & Enjoy",
    description: "Set up and use your equipment for your home workouts."
  },
  {
    icon: <Phone className="h-8 w-8 text-[#FF5A5F]" />,
    title: "Support",
    description: "Get assistance anytime for equipment setup or troubleshooting."
  }
];

const benefits = [
  {
    icon: <Clock className="h-8 w-8 text-[#00A699]" />,
    title: "Flexibility",
    description: "No long-term commitments. Rent only for as long as you need."
  },
  {
    icon: <Award className="h-8 w-8 text-[#00A699]" />,
    title: "Quality Equipment",
    description: "All our equipment is professional-grade and well-maintained."
  },
  {
    icon: <CreditCard className="h-8 w-8 text-[#00A699]" />,
    title: "Cost-Effective",
    description: "Save money by renting instead of buying expensive equipment."
  }
];

export default function HowItWorksPage() {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-[#FF5A5F] mr-4">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h1>
        </div>
        
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-12 bg-gradient-to-r from-[#FF5A5F]/90 to-[#FF5A5F]/60">
          {!imageError && (
            <Image
              src="/images/how-it-works-hero.jpg"
              alt="Gym equipment rental process"
              fill
              style={{ objectFit: 'cover' }}
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Rent Gym Equipment with Ease</h2>
            <p className="text-gray-200">Transform your home workout experience without the hefty investment.</p>
          </div>
        </div>
        
        {/* Process Steps */}
        <div className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Renting Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  {index + 1}. {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Why Rent With Us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-[#FF5A5F] to-[#FF5A5F]/80 p-8 rounded-xl text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="mb-6 max-w-xl mx-auto">
            Browse our collection of premium gym equipment and start working out from the comfort of your home.
          </p>
          <Link 
            href="/categories" 
            className="inline-block bg-white text-[#FF5A5F] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Browse Equipment
          </Link>
        </div>
      </div>
    </div>
  );
} 