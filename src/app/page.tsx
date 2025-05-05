'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import CategoryMenu from '@/components/CategoryMenu';
import ProductGrid from '@/components/ProductGrid';
import equipmentData from '@/data/equipment.json';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Equipment {
  id: string;
  name: string;
  categoryId: string;
  image: string;
  images: string[];
  monthlyPrice: number;
  originalPrice: number;
  discount: number;
  deliveryTime: string;
  isNew: boolean;
  description: string;
  features: string[];
  rentalOptions: {
    duration: string;
    price: number;
  }[];
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[];
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    // Load data from our JSON file
    setCategories(equipmentData.categories);
    setEquipment(equipmentData.equipment);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Categories Menu */}
      <CategoryMenu categories={categories} />
      
      {/* Featured Products */}
      <ProductGrid equipment={equipment} title="Featured Equipment" />
      
      {/* How It Works Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF5A5F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#FF5A5F] text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Browse Equipment</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explore our wide range of premium gym equipment available for rent.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF5A5F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#FF5A5F] text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Choose Rental Duration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select a flexible rental period that suits your needs - weekly or monthly.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF5A5F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#FF5A5F] text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Get Delivery at Home</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We deliver and set up the equipment at your home, ready for your workout.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Rahul Mehta</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Renting the treadmill was the best decision I made. Perfect for my small apartment and saved me a ton of money compared to buying one."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Priya Sharma</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The quality of the equipment is amazing! The delivery was prompt and the team was very professional in setting it up at my home."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Vijay Kumar</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Great service and easy ordering process. I rented dumbbells and a bench - now I can work out whenever I want without gym membership fees."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
