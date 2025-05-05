'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, User, Package, CreditCard, Clock, CheckCircle, Calendar, Settings, LogOut } from 'lucide-react';

// Mock subscription data
const subscriptionData = {
  plan: 'Premium',
  status: 'Active',
  nextBillingDate: '15 June 2023',
  amount: '₹1,499',
  paymentMethod: 'XXXX XXXX XXXX 4242',
  rentalItems: [
    {
      id: '1',
      name: 'Pro Fitness Exercise Bike',
      rentedOn: '15 May 2023',
      returnDate: '15 June 2023',
      image: 'https://images.unsplash.com/photo-1591291621164-2c6367723315?w=800&auto=format&fit=crop&q=60',
      status: 'Active'
    },
    {
      id: '3',
      name: '20kg Adjustable Dumbbell Set',
      rentedOn: '20 May 2023',
      returnDate: '20 June 2023',
      image: 'https://images.unsplash.com/photo-1638536532686-d610adcd3c14?w=800&auto=format&fit=crop&q=60',
      status: 'Active'
    }
  ],
  pastRentals: [
    {
      id: '5',
      name: 'Yoga Mat Premium',
      rentedOn: '10 March 2023',
      returnDate: '10 April 2023',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=60',
      status: 'Returned'
    },
    {
      id: '8',
      name: 'Treadmill T200',
      rentedOn: '5 January 2023',
      returnDate: '5 February 2023',
      image: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=800&auto=format&fit=crop&q=60',
      status: 'Returned'
    }
  ]
};

// Mock user data
const userData = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  address: '123 Park Street, Koramangala, Bangalore - 560034',
  profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60',
  memberSince: 'January 2023'
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('subscription');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-[#FF5A5F] mr-4">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Profile
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
              {/* Profile Summary */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-200 dark:bg-gray-700">
                  <Image 
                    src={userData.profileImage}
                    alt={userData.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=FF5A5F&color=fff';
                    }}
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{userData.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</p>
                <p className="text-xs text-[#FF5A5F] mt-1">
                  {subscriptionData.plan} Member
                </p>
              </div>
              
              {/* Navigation */}
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('subscription')}
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${
                    activeTab === 'subscription' 
                      ? 'bg-[#FF5A5F]/10 text-[#FF5A5F]' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <CreditCard size={18} className="mr-3" />
                  Subscription
                </button>
                <button 
                  onClick={() => setActiveTab('rentals')}
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${
                    activeTab === 'rentals' 
                      ? 'bg-[#FF5A5F]/10 text-[#FF5A5F]' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Package size={18} className="mr-3" />
                  My Rentals
                </button>
                <button 
                  onClick={() => setActiveTab('account')}
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${
                    activeTab === 'account' 
                      ? 'bg-[#FF5A5F]/10 text-[#FF5A5F]' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <User size={18} className="mr-3" />
                  Account Details
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${
                    activeTab === 'settings' 
                      ? 'bg-[#FF5A5F]/10 text-[#FF5A5F]' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Settings size={18} className="mr-3" />
                  Settings
                </button>
                <Link 
                  href="/"
                  className="w-full flex items-center px-4 py-3 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </Link>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div className="space-y-6">
                {/* Subscription Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Subscription Details</h2>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      subscriptionData.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {subscriptionData.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Plan</p>
                      <p className="font-medium text-gray-900 dark:text-white">{subscriptionData.plan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Next Billing Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">{subscriptionData.nextBillingDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Monthly Amount</p>
                      <p className="font-medium text-gray-900 dark:text-white">{subscriptionData.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                      <p className="font-medium text-gray-900 dark:text-white flex items-center">
                        <CreditCard size={16} className="mr-2" />
                        {subscriptionData.paymentMethod}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      You can cancel your subscription at any time.
                    </p>
                    <button className="px-4 py-2 text-sm text-[#FF5A5F] border border-[#FF5A5F] rounded-md hover:bg-[#FF5A5F] hover:text-white transition-colors">
                      Manage Subscription
                    </button>
                  </div>
                </div>
                
                {/* Subscription Benefits */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Premium Benefits</h2>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 mt-0.5 text-[#00A699]" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Up to 5 equipment rentals at a time</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 mt-0.5 text-[#00A699]" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Free delivery and pickup</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 mt-0.5 text-[#00A699]" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Access to premium equipment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 mt-0.5 text-[#00A699]" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Priority customer support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={18} className="mr-2 mt-0.5 text-[#00A699]" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Flexible rental extensions</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* Rentals Tab */}
            {activeTab === 'rentals' && (
              <div className="space-y-6">
                {/* Active Rentals */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Rentals</h2>
                  
                  {subscriptionData.rentalItems.length > 0 ? (
                    <div className="space-y-4">
                      {subscriptionData.rentalItems.map((item) => (
                        <div key={item.id} className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div className="relative h-32 md:w-32 md:h-32 bg-gray-200 dark:bg-gray-700">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              style={{ objectFit: 'cover' }}
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/400x400/FF5A5F/FFFFFF?text=Gym+Z';
                              }}
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex flex-col md:flex-row md:justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                                <div className="flex items-center mt-1 mb-2">
                                  <Calendar size={14} className="text-gray-500 dark:text-gray-400 mr-1" />
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.rentedOn} - {item.returnDate}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2 md:mt-0 flex items-center">
                                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                  {item.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <button className="text-sm text-[#FF5A5F] hover:underline">
                                Extend Rental
                              </button>
                              <button className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
                                Request Return
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      You don't have any active rentals.
                    </p>
                  )}
                </div>
                
                {/* Past Rentals */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rental History</h2>
                  
                  {subscriptionData.pastRentals.length > 0 ? (
                    <div className="space-y-4">
                      {subscriptionData.pastRentals.map((item) => (
                        <div key={item.id} className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div className="relative h-32 md:w-32 md:h-32 bg-gray-200 dark:bg-gray-700">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              style={{ objectFit: 'cover' }}
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/400x400/FF5A5F/FFFFFF?text=Gym+Z';
                              }}
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex flex-col md:flex-row md:justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                                <div className="flex items-center mt-1 mb-2">
                                  <Calendar size={14} className="text-gray-500 dark:text-gray-400 mr-1" />
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.rentedOn} - {item.returnDate}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2 md:mt-0 flex items-center">
                                <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                  {item.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <button className="text-sm text-[#FF5A5F] hover:underline">
                                Rent Again
                              </button>
                              <Link href="/categories" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
                                Browse Similar
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      You don't have any rental history.
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Account Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Full Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email Address</p>
                    <p className="font-medium text-gray-900 dark:text-white">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone Number</p>
                    <p className="font-medium text-gray-900 dark:text-white">{userData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Member Since</p>
                    <p className="font-medium text-gray-900 dark:text-white">{userData.memberSince}</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-4">Delivery Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">{userData.address}</p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between gap-4">
                  <button className="px-4 py-2 text-sm bg-[#FF5A5F] text-white rounded-md hover:bg-[#E0484D] transition-colors">
                    Edit Profile
                  </button>
                  <button className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Email Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF5A5F]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">SMS Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF5A5F]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Promotional Emails</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF5A5F]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Dark Mode</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF5A5F]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Auto-renew Subscription</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF5A5F]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Privacy</h3>
                    <div className="space-y-3">
                      <button className="text-[#FF5A5F] hover:underline text-sm">Privacy Settings</button>
                      <button className="text-[#FF5A5F] hover:underline text-sm">Delete Account</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 