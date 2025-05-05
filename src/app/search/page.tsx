'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import equipmentData from '@/data/equipment.json';

interface Equipment {
  id: string;
  name: string;
  image: string;
  monthlyPrice: number;
  originalPrice: number;
  discount: number;
  deliveryTime: string;
  description: string;
  isNew?: boolean;
  categoryId: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      // Search in equipment names and descriptions
      const results = equipmentData.equipment.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) || 
        (item.description && item.description.toLowerCase().includes(lowerQuery))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
    setIsLoading(false);
  }, [query]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back and Search Results Title */}
        <div className="flex items-center mb-8">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-[#FF5A5F] mr-4">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isLoading ? 'Searching...' : `Search Results: ${query}`}
          </h1>
        </div>
        
        {/* Search Results */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-12 h-12 border-4 border-[#FF5A5F] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <ProductGrid equipment={searchResults} />
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find any equipment matching "{query}".
            </p>
            <Link 
              href="/"
              className="inline-block bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-semibold py-3 px-6 rounded-md transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 