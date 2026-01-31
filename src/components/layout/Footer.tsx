import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white text-lg font-bold mb-4">RentFlow</h4>
            <p className="text-sm">
              The complete solution for managing rental orders, inventory, and invoicing.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">For Customers</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Browse Catalog</a></li>
              <li><a href="#" className="hover:text-white">My Orders</a></li>
              <li><a href="#" className="hover:text-white">Track Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">For Vendors</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Vendor Dashboard</a></li>
              <li><a href="#" className="hover:text-white">Inventory Mgmt</a></li>
              <li><a href="#" className="hover:text-white">Reports</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>support@rentflow.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; 2024 RentFlow System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};