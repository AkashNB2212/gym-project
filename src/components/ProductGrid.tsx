'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useCart } from '@/context/CartContext';

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

interface ProductGridProps {
  equipment: Equipment[];
  title?: string;
  categoryFilter?: string;
}

const ProductGrid = ({ equipment, title, categoryFilter }: ProductGridProps) => {
  const [visibleProducts, setVisibleProducts] = useState<Equipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  const { addToCart, isInCart, getCartQuantity, removeFromCart } = useCart();

  // Apply category filter if provided
  useEffect(() => {
    if (categoryFilter) {
      setFilteredEquipment(equipment.filter(item => item.categoryId === categoryFilter));
      setPage(1); // Reset pagination when filter changes
    } else {
      setFilteredEquipment(equipment);
    }
  }, [equipment, categoryFilter]);

  // Handle pagination
  useEffect(() => {
    const initialProducts = filteredEquipment.slice(0, page * productsPerPage);
    setVisibleProducts(initialProducts);
  }, [filteredEquipment, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleAddToCart = (id: string, quantity: number) => {
    if (quantity === 0) {
      // Remove from cart if quantity is 0
      removeFromCart(id);
      return;
    }
    
    const product = equipment.find(item => item.id === id);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.monthlyPrice,
        originalPrice: product.originalPrice,
        discount: product.discount,
        duration: '1 month', // Default duration
        deliveryTime: product.deliveryTime
      }, quantity);
    }
  };

  const hasMoreProducts = visibleProducts.length < filteredEquipment.length;

  // Show a message if no products match the filter
  if (filteredEquipment.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        {title && (
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
        )}
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No equipment found in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {visibleProducts.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            monthlyPrice={item.monthlyPrice}
            originalPrice={item.originalPrice}
            discount={item.discount}
            deliveryTime={item.deliveryTime}
            isNew={item.isNew}
            onAddToCart={handleAddToCart}
            isInCart={isInCart(item.id)}
            cartQuantity={getCartQuantity(item.id)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 