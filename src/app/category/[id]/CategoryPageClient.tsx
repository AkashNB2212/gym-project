'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';

interface Equipment {
  id: string;
  name: string;
  image: string;
  monthlyPrice: number;
  originalPrice: number;
  discount: number;
  deliveryTime: string;
  isNew?: boolean;
  categoryId: string;
}

interface CategoryPageClientProps {
  categoryName: string;
  equipment: Equipment[];
  categoryId: string;
}

export default function CategoryPageClient({ categoryName, equipment, categoryId }: CategoryPageClientProps) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back and Category Title */}
        <div className="flex items-center mb-8">
          <Link href="/categories" className="text-gray-600 dark:text-gray-300 hover:text-[#FF5A5F] mr-4">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {categoryName} Equipment
          </h1>
        </div>
        
        {/* Products Grid */}
        <ProductGrid 
          equipment={equipment} 
          categoryFilter={categoryId}
        />
      </div>
    </div>
  );
} 