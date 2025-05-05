'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, Trash2, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  monthlyPrice: number;
  originalPrice: number;
  discount: number;
  deliveryTime: string;
  isNew?: boolean;
  onAddToCart: (id: string, quantity: number) => void;
  isInCart: boolean;
  cartQuantity: number;
}

const ProductCard = ({ 
  id, 
  name, 
  image, 
  monthlyPrice, 
  originalPrice, 
  discount, 
  deliveryTime, 
  isNew,
  onAddToCart,
  isInCart,
  cartQuantity
}: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isProductInWishlist = isInWishlist(id);

  // Reset quantity if item is removed from cart
  useEffect(() => {
    if (!isInCart) {
      setQuantity(1);
    } else {
      setQuantity(cartQuantity);
    }
  }, [isInCart, cartQuantity]);

  const handleAddToCart = () => {
    onAddToCart(id, quantity);
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    
    if (isInCart) {
      onAddToCart(id, newQuantity);
    }
  };

  const removeFromCart = () => {
    onAddToCart(id, 0);
  };

  const toggleWishlist = () => {
    if (isProductInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name,
        image,
        price: monthlyPrice,
        originalPrice,
        discount
      });
    }
  };

  return (
    <div className="product-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
      <Link href={`/product/${id}`} className="block relative">
        {/* New Tag */}
        {isNew && (
          <span className="absolute left-2 top-2 z-10 bg-[#00A699] text-white text-xs px-2 py-1 rounded">
            New
          </span>
        )}
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist();
          }}
          className="absolute right-2 top-2 z-10 bg-white dark:bg-gray-700 rounded-full p-1.5 text-gray-400 hover:text-[#FF5A5F] transition-colors"
          aria-label={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={18} 
            fill={isProductInWishlist ? "#FF5A5F" : "none"} 
            className={isProductInWishlist ? "text-[#FF5A5F]" : ""} 
          />
        </button>
        
        {/* Product Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 ${isLoading ? 'block' : 'hidden'}`} />
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${id}`} className="block">
          <h3 className="font-medium text-gray-900 dark:text-white text-sm md:text-base mb-1 line-clamp-2">
            {name}
          </h3>
        </Link>
        
        {/* Pricing */}
        <div className="flex items-baseline mt-2 mb-1">
          <span className="text-[#FF5A5F] font-semibold text-base md:text-lg">₹{monthlyPrice}/mo</span>
          <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs line-through price-tag">₹{originalPrice}</span>
          <span className="ml-2 text-[#00A699] text-xs">{discount}% off</span>
        </div>
        
        {/* Delivery Time */}
        <p className="text-gray-500 dark:text-gray-400 text-xs">Delivered in {deliveryTime}</p>
        
        {/* Add to Cart Button or Quantity Controls */}
        {isInCart ? (
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => updateQuantity(quantity - 1)}
                className="h-8 w-8 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center justify-center rounded-l-md"
              >
                <Minus size={16} />
              </button>
              <div className="h-8 px-3 bg-white dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200">
                {quantity}
              </div>
              <button 
                onClick={() => updateQuantity(quantity + 1)}
                className="h-8 w-8 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center justify-center rounded-r-md"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={removeFromCart}
                className="ml-2 h-8 w-8 bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                aria-label="Remove from cart"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={handleAddToCart}
            className="w-full mt-3 bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 