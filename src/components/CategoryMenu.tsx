'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Dumbbell, Bike, Weight, Boxes, Coffee, Zap } from 'lucide-react';

// Map category icons to Lucide components
const categoryIcons: { [key: string]: React.ReactNode } = {
  'exercise-bike': <Bike size={24} />,
  'dumbbell': <Dumbbell size={24} />,
  'weight': <Weight size={24} />,
  'boxing-glove': <Boxes size={24} />,
  'yoga-mat': <Coffee size={24} />, // Using Coffee as a placeholder for yoga mat
  'resistance-band': <Zap size={24} />, // Using Zap as a placeholder for resistance band
};

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryMenuProps {
  categories: Category[];
}

const CategoryMenu = ({ categories }: CategoryMenuProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 200;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      
      // Check if we can scroll left
      setShowLeftArrow(current.scrollLeft > 0);
      
      // Check if we can scroll right
      setShowRightArrow(
        current.scrollLeft < current.scrollWidth - current.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const { current } = scrollRef;
    if (current) {
      current.addEventListener('scroll', handleScroll);
      // Check initially
      handleScroll();
      
      return () => {
        current.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div className="relative py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        {/* Left scroll arrow */}
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-1 rounded-full shadow-md hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        )}
        
        {/* Categories */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar space-x-6 py-2 category-scroll" 
        >
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/category/${category.id}`} 
              className="flex flex-col items-center justify-center min-w-[80px] text-center group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-2 group-hover:bg-[#FF5A5F] group-hover:text-white text-gray-600 dark:text-gray-300 transition-colors">
                {categoryIcons[category.icon] || <Dumbbell size={24} />}
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#FF5A5F]">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
        
        {/* Right scroll arrow */}
        {showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-1 rounded-full shadow-md hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryMenu; 