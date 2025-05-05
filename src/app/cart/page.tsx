'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

// Mocked cart items for demo
const mockCartItems = [
  {
    id: '1',
    name: 'Pro Fitness Exercise Bike',
    image: '/images/exercise-bike.jpg',
    price: 714,
    originalPrice: 1499,
    discount: 51,
    quantity: 1,
    duration: '1 month',
    deliveryTime: '4-6 days'
  },
  {
    id: '2',
    name: '10kg Dumbbell Set',
    image: '/images/dumbbell-set.jpg',
    price: 399,
    originalPrice: 799,
    discount: 50,
    quantity: 1,
    duration: '1 month',
    deliveryTime: '2-3 days'
  }
];

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  quantity: number;
  duration: string;
  deliveryTime: string;
}

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Delivery fee (free above ₹999)
  const deliveryFee = subtotal > 999 ? 0 : 99;
  
  // Calculate total
  const total = subtotal + deliveryFee;
  
  // GST (5%)
  const gst = Math.round(total * 0.05);
  
  // Grand total
  const grandTotal = total + gst;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-[#FF5A5F] mr-4">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cart</h1>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-4">
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`p-4 ${
                    index !== cartItems.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-20 relative rounded overflow-hidden mr-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    
                    <div className="flex-1">
                      {/* Product Info */}
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <div>
                          <Link 
                            href={`/product/${item.id}`} 
                            className="text-gray-900 dark:text-white font-medium hover:text-[#FF5A5F]"
                          >
                            {item.name}
                          </Link>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Rental Duration: {item.duration}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">
                            Delivery in {item.deliveryTime}
                          </p>
                        </div>
                        
                        <div className="mt-2 md:mt-0 md:text-right">
                          <p className="text-[#FF5A5F] font-semibold">₹{item.price}</p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span className="line-through">₹{item.originalPrice}</span>
                            <span className="ml-1 text-[#00A699]">{item.discount}% off</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quantity and Remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 py-1 text-gray-800 dark:text-gray-200">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Delivery Fee</span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">GST (5%)</span>
                  <span className="text-gray-900 dark:text-white font-medium">₹{gst}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-900 dark:text-white font-semibold">Total</span>
                    <span className="text-[#FF5A5F] font-bold">₹{grandTotal}</span>
                  </div>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label htmlFor="promo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="promo"
                    placeholder="Enter promo code"
                    className="flex-1 border border-gray-300 dark:border-gray-700 rounded-l-md py-2 px-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-[#FF5A5F]"
                  />
                  <button className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 border-l-0 rounded-r-md px-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Checkout Button */}
              <Link 
                href="/checkout"
                className="block w-full bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-semibold py-3 px-4 rounded-md text-center transition-colors"
              >
                Proceed to Checkout
              </Link>
              
              {/* Continue Shopping */}
              <Link 
                href="/"
                className="block w-full text-center mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-[#FF5A5F]"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // Empty Cart
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            href="/"
            className="inline-block bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
} 