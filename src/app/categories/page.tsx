'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import equipmentData from '@/data/equipment.json';

interface Category {
  id: string;
  name: string;
  icon: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    setCategories(equipmentData.categories);
  }, []);

  // Example images for categories (since the actual data might not have images)
  const getCategoryImage = (categoryId: string) => {
    const imageMappings: {[key: string]: string} = {
      '1': 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&auto=format&fit=crop&q=60', // Cardio
      '2': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=60', // Strength
      '3': 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=60', // Weights
      '4': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=60', // Yoga
      '5': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60', // Accessories
      // Fallback to a default image
      'default': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60'
    };
    
    return imageMappings[categoryId] || imageMappings['default'];
  };

  const handleImageError = (categoryId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [categoryId]: true
    }));
  };

  // Get category color based on id
  const getCategoryColor = (categoryId: string) => {
    const colorMappings: {[key: string]: string} = {
      '1': 'from-red-500 to-red-400',
      '2': 'from-blue-500 to-blue-400',
      '3': 'from-green-500 to-green-400',
      '4': 'from-purple-500 to-purple-400',
      '5': 'from-yellow-500 to-yellow-400',
      // Default color
      'default': 'from-[#FF5A5F] to-[#FF5A5F]/70'
    };
    
    return colorMappings[categoryId] || colorMappings['default'];
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-[#FF5A5F] mr-4">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Browse Equipment Categories
          </h1>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${getCategoryColor(category.id)}`}>
                {!imageErrors[category.id] && (
                  <Image
                    src={getCategoryImage(category.id)}
                    alt={category.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    onError={() => handleImageError(category.id)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200">Explore {category.name} Equipment</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* If no categories available */}
        {categories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">No categories available.</p>
          </div>
        )}
      </div>
    </div>
  );
} 