import React from 'react';
import { Clock, ShoppingCart, Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div className="flex items-center cursor-pointer">
            <div className="bg-indigo-600 p-2 rounded-lg mr-2">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              RentFlow
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium">Browse</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 font-medium">How it Works</a>
            {/* Vendor specific link [cite: 108] */}
            <a href="/vendor" className="text-gray-600 hover:text-indigo-600 font-medium">Vendor Portal</a>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-indigo-600 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </button>
            
            <div className="hidden md:flex items-center space-x-3">
              <button className="text-gray-600 font-medium hover:text-gray-900">Log in</button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Sign Up
              </button>
            </div>
            
            <button className="md:hidden text-gray-500">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};