'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import equipmentData from '@/data/equipment.json';

interface CategoryPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [categoryName, setCategoryName] = useState('');
  
  useEffect(() => {
    // Find category name
    const category = equipmentData.categories.find(cat => cat.id === params.id);
    if (category) {
      setCategoryName(category.name);
    }
  }, [params.id]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back and Category Title */}
        <div className="flex items-center mb-8">
          <Link href="/categories" className="text-gray-600 dark:text-gray-300 hover:text-[#FF5A5F] mr-4">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {categoryName || 'Category'} Equipment
          </h1>
        </div>
        
        {/* Products Grid */}
        <ProductGrid 
          equipment={equipmentData.equipment} 
          categoryFilter={params.id}
        />
      </div>
    </div>
  );
} 