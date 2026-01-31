'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  ShoppingCart, 
  User, 
  Menu, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  MapPin,
  Star
} from 'lucide-react';

// --- Types & Interfaces ---
interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  period: 'Hour' | 'Day' | 'Week';
  rating: number;
  isAvailable: boolean;
}

// --- Mock Data (Database Simulation) ---
const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Industrial Power Drill',
    category: 'Tools',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
    price: 150,
    period: 'Day',
    rating: 4.8,
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Conference Projector 4K',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    price: 50,
    period: 'Hour',
    rating: 4.9,
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Executive Office Chair',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=800',
    price: 800,
    period: 'Week',
    rating: 4.5,
    isAvailable: false,
  },
];

// --- Main Page Component ---
export default function RentalHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* ================= HEADER / NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer group">
              <div className="bg-indigo-600 p-2.5 rounded-xl mr-3 shadow-indigo-200 shadow-lg group-hover:bg-indigo-700 transition-all">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-gray-900 tracking-tight">RentFlow</span>
                <span className="text-xs block text-gray-500 font-medium tracking-wide">PMS & RENTALS</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-semibold text-sm uppercase tracking-wide transition-colors">Browse Gear</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-semibold text-sm uppercase tracking-wide transition-colors">How it Works</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 font-semibold text-sm uppercase tracking-wide transition-colors">Vendor Portal</a>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-5">
              <button className="text-gray-500 hover:text-indigo-600 relative transition-transform hover:scale-110">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">2</span>
              </button>
              
              <div className="hidden md:flex items-center space-x-3 pl-4 border-l border-gray-200">
                <button className="text-gray-600 font-semibold hover:text-gray-900 px-3 py-2">Log in</button>
                <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                  Sign Up
                </button>
              </div>
              
              <button 
                className="md:hidden text-gray-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 font-medium">Browse Gear</a>
              <a href="#" className="text-gray-700 font-medium">Vendor Portal</a>
              <hr />
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold">Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30"
            alt="Warehouse Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-32 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Live Inventory: 2,450 Items Available
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Rent Smart. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Work Harder.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 font-light">
            The enterprise-grade platform for managing equipment rentals. 
            Automated quotes, real-time availability, and instant invoicing.
          </p>

          {/* --- SEARCH & BOOKING WIDGET --- */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row gap-3 w-full max-w-5xl">
            
            {/* Search Input */}
            <div className="flex-[1.5] flex items-center px-5 py-4 bg-white rounded-xl shadow-sm group focus-within:ring-2 ring-indigo-500 transition-all">
              <Search className="h-5 w-5 text-gray-400 mr-3 group-focus-within:text-indigo-600" />
              <div className="w-full">
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Looking for?</label>
                <input 
                  type="text" 
                  placeholder="Drills, Cameras, Generators..." 
                  className="bg-transparent w-full focus:outline-none text-gray-900 placeholder-gray-400 font-medium"
                />
              </div>
            </div>
            
            {/* Start Date */}
            <div className="flex-1 flex items-center px-5 py-4 bg-white rounded-xl shadow-sm group focus-within:ring-2 ring-indigo-500 transition-all">
              <Calendar className="h-5 w-5 text-gray-400 mr-3 group-focus-within:text-indigo-600" />
              <div className="w-full">
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Pickup</label>
                <input type="datetime-local" className="bg-transparent w-full text-sm text-gray-900 focus:outline-none font-medium" />
              </div>
            </div>

            {/* End Date */}
            <div className="flex-1 flex items-center px-5 py-4 bg-white rounded-xl shadow-sm group focus-within:ring-2 ring-indigo-500 transition-all">
              <Clock className="h-5 w-5 text-gray-400 mr-3 group-focus-within:text-indigo-600" />
              <div className="w-full">
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">Return</label>
                <input type="datetime-local" className="bg-transparent w-full text-sm text-gray-900 focus:outline-none font-medium" />
              </div>
            </div>

            {/* Submit Button */}
            <button className="flex-none bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center">
              Check Availability
            </button>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT SECTION ================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Rentals</h2>
            <p className="text-gray-500 text-lg max-w-xl">
              High-demand equipment available for immediate pickup. 
              Reserve now to secure your stock.
            </p>
          </div>
          <a href="#" className="hidden md:flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition-colors bg-indigo-50 px-6 py-3 rounded-full">
            View Full Catalog <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col"
            >
              {/* Image Area */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Availability Badge */}
                <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-xs font-bold shadow-md backdrop-blur-md border ${
                  product.isAvailable 
                    ? 'bg-white/90 text-green-700 border-green-200' 
                    : 'bg-white/90 text-red-600 border-red-200'
                }`}>
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    product.isAvailable ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  {product.isAvailable ? 'Available Now' : 'Out of Stock'}
                </div>
                
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                  {product.category}
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-600 ml-1">{product.rating} (124 reviews)</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Rate</span>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-black text-gray-900">${product.price}</span>
                      <span className="text-gray-500 font-medium ml-1">/ {product.period.toLowerCase()}</span>
                    </div>
                  </div>
                  
                  <button 
                    disabled={!product.isAvailable}
                    className={`px-6 py-3 rounded-xl font-bold text-sm shadow-lg transform transition-all active:scale-95 ${
                      product.isAvailable 
                        ? 'bg-gray-900 text-white hover:bg-indigo-600 hover:shadow-indigo-200' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {product.isAvailable ? 'Add to Cart' : 'Notify Me'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 md:hidden text-center">
           <a href="#" className="inline-flex items-center text-indigo-600 font-bold">
            View Full Catalog <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* ================= FEATURES / HOW IT WORKS ================= */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Seamless Rental Lifecycle</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our system handles the complexity of inventory management so you can focus on the project.
            </p>
          </div>
          
          <div className="relative grid md:grid-cols-4 gap-12">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-700/50 -z-0"></div>

            {[
              { 
                icon: Search, 
                title: '1. Browse & Quote', 
                desc: 'Select your dates and get an instant price quotation.',
                color: 'bg-blue-500' 
              }, 
              { 
                icon: ShieldCheck, 
                title: '2. Confirm & Verify', 
                desc: 'Secure identification and payment locks your reservation.',
                color: 'bg-indigo-500' 
              }, 
              { 
                icon: MapPin, 
                title: '3. Pickup / Delivery', 
                desc: 'Digital handover. Stock status updates automatically.',
                color: 'bg-purple-500' 
              }, 
              { 
                icon: CheckCircle, 
                title: '4. Return & Invoice', 
                desc: 'Drop it off. We handle inspection and final invoicing.',
                color: 'bg-green-500' 
              } 
            ].map((feature, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-8 shadow-2xl transform transition-transform group-hover:-translate-y-2 ${feature.color} bg-opacity-20 border border-white/10 backdrop-blur-sm`}>
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-600 p-1.5 rounded-lg mr-2">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">RentFlow</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                The #1 choice for construction, electronics, and event equipment rentals. 
                Built for speed, security, and scale.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Customer Zone</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Track My Order</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Rental Policies</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Vendor Hub</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Partner with Us</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Vendor Login</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Inventory API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Stay Updated</h4>
              <div className="flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="bg-gray-900 text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; 2024 RentFlow Systems. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
              <a href="#" className="hover:text-gray-900">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}