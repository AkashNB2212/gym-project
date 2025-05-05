'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Heart, ShoppingCart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (id: string) => {
    const item = wishlistItems.find(item => item.id === id);
    if (item) {
      addToCart({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        originalPrice: item.originalPrice,
        discount: item.discount,
        duration: '1 month', // Default duration
        deliveryTime: '3-5 days' // Default delivery time
      }, 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-[#FF5A5F] mr-4">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Wishlist</h1>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <Link href={`/product/${item.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </Link>
                
                {/* Remove from Wishlist Button */}
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute right-2 top-2 z-10 bg-white dark:bg-gray-700 rounded-full p-1.5 text-[#FF5A5F] hover:bg-[#FF5A5F] hover:text-white transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Heart size={18} fill="#FF5A5F" />
                </button>
              </div>
              
              <div className="p-4">
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm md:text-base mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                </Link>
                
                {/* Pricing */}
                <div className="flex items-baseline mt-2 mb-3">
                  <span className="text-[#FF5A5F] font-semibold text-base md:text-lg">₹{item.price}/mo</span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs line-through">₹{item.originalPrice}</span>
                  <span className="ml-2 text-[#00A699] text-xs">{item.discount}% off</span>
                </div>
                
                {/* Add to Cart Button */}
                <button 
                  onClick={() => handleAddToCart(item.id)}
                  className={`w-full flex items-center justify-center py-2 px-4 rounded transition-colors ${
                    isInCart(item.id) 
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      : 'bg-[#FF5A5F] hover:bg-[#E0484D] text-white'
                  }`}
                  disabled={isInCart(item.id)}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  {isInCart(item.id) ? 'Already in Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty Wishlist
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <Heart size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Save items you love to your wishlist for easy access later.</p>
          <Link 
            href="/"
            className="inline-block bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
} 