'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Star, Truck, CalendarDays, Check, Trash2, Heart } from 'lucide-react';
import equipmentData from '@/data/equipment.json';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface RentalOption {
  duration: string;
  price: number;
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Product {
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
  rentalOptions: RentalOption[];
  reviews: Review[];
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedRental, setSelectedRental] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart, getCartQuantity, removeFromCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    // Find the product with the given ID
    const foundProduct = equipmentData.equipment.find(item => item.id === params.id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.images[0]);
      setSelectedRental(foundProduct.rentalOptions[1]?.duration || foundProduct.rentalOptions[0]?.duration);
    }
    
    setLoading(false);
  }, [params.id]);

  // Update quantity if already in cart
  useEffect(() => {
    if (product && isInCart(product.id)) {
      setQuantity(getCartQuantity(product.id));
    }
  }, [product, isInCart, getCartQuantity]);

  // Calculate average rating
  const averageRating = product?.reviews.reduce((acc, review) => acc + review.rating, 0) || 0;
  const formattedRating = product ? (averageRating / product.reviews.length).toFixed(1) : '0';

  // Get selected rental price
  const selectedRentalPrice = product?.rentalOptions.find(option => option.duration === selectedRental)?.price || 0;

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: selectedRentalPrice,
        originalPrice: product.originalPrice,
        discount: product.discount,
        duration: selectedRental,
        deliveryTime: product.deliveryTime
      }, quantity);
    }
  };

  const handleRemoveFromCart = () => {
    if (product) {
      removeFromCart(product.id);
    }
  };

  const toggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        image: product.image,
        price: selectedRentalPrice,
        originalPrice: product.originalPrice,
        discount: product.discount
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-12 h-12 border-4 border-[#FF5A5F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/" className="text-[#FF5A5F] hover:underline">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-[#FF5A5F] mb-6">
        <ChevronLeft size={20} className="mr-1" />
        Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          {/* Main Image */}
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-4 bg-white dark:bg-gray-800">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              className="p-4"
            />
            {product.isNew && (
              <span className="absolute left-4 top-4 bg-[#00A699] text-white text-xs px-2 py-1 rounded">
                New
              </span>
            )}
          </div>
          
          {/* Image Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`relative rounded-md overflow-hidden h-20 ${
                  selectedImage === image ? 'ring-2 ring-[#FF5A5F]' : 'ring-1 ring-gray-200 dark:ring-gray-700'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <button
              onClick={toggleWishlist}
              className="flex items-center justify-center p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-[#FF5A5F] focus:outline-none"
              aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart 
                size={24} 
                fill={isInWishlist(product.id) ? "#FF5A5F" : "none"} 
                className={isInWishlist(product.id) ? "text-[#FF5A5F]" : ""} 
              />
            </button>
          </div>
          
          {/* Ratings */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(parseFloat(formattedRating)) ? 'currentColor' : 'none'}
                  className="text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {formattedRating} ({product.reviews.length} reviews)
            </span>
          </div>
          
          {/* Pricing */}
          <div className="mb-6">
            <div className="flex items-baseline mb-2">
              <span className="text-2xl text-[#FF5A5F] font-bold">₹{selectedRentalPrice}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                /{selectedRental.toLowerCase().replace('month', 'mo').replace('week', 'wk')}
              </span>
              <span className="ml-4 text-gray-500 dark:text-gray-400 text-sm line-through">
                ₹{product.originalPrice}
              </span>
              <span className="ml-2 text-[#00A699] text-sm">{product.discount}% off</span>
            </div>
            <p className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
              <Truck size={16} className="mr-2" />
              Delivered in {product.deliveryTime}
            </p>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{product.description}</p>
          </div>
          
          {/* Features */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <Check size={16} className="mr-2 mt-0.5 text-[#00A699]" />
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Rental Options */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Choose Rental Period
            </h2>
            <div className="flex flex-wrap gap-3">
              {product.rentalOptions.map((option) => (
                <button
                  key={option.duration}
                  onClick={() => setSelectedRental(option.duration)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium 
                    ${
                      selectedRental === option.duration
                        ? 'border-[#FF5A5F] bg-[#FF5A5F]/10 text-[#FF5A5F]'
                        : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#FF5A5F]'
                    }`}
                >
                  <div className="flex flex-col">
                    <span>{option.duration}</span>
                    <span className="font-semibold">₹{option.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Quantity</h2>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 dark:border-gray-700 rounded-l-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                -
              </button>
              <div className="w-12 h-10 border-t border-b border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 dark:border-gray-700 rounded-r-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className="flex gap-4">
            {isInCart(product.id) ? (
              <>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Update Cart
                </button>
                <button 
                  onClick={handleRemoveFromCart}
                  className="bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 p-3 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  aria-label="Remove from cart"
                >
                  <Trash2 size={20} />
                </button>
              </>
            ) : (
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Add to Cart
              </button>
            )}
            <Link
              href="/cart"
              className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
      
      {/* Customer Reviews */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-12">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Customer Reviews ({product.reviews.length})
        </h2>
        
        {product.reviews.length > 0 ? (
          <div className="grid gap-6">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{review.user}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.rating ? 'currentColor' : 'none'}
                          className="text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">2 weeks ago</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
        )}
      </div>
      
      {/* Related Products Section */}
      <div>
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">You might also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {equipmentData.equipment
            .filter(
              (item) => item.id !== product.id && item.categoryId === product.categoryId
            )
            .slice(0, 4)
            .map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                <Link href={`/product/${item.id}`} className="block relative">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-[#FF5A5F] font-semibold text-sm">₹{item.monthlyPrice}/mo</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
} 