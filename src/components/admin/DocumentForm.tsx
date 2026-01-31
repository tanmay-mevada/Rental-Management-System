'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Search, Loader2, Check, X as XIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export type DocumentMode = 'order' | 'invoice';

interface DocumentFormProps {
  mode: DocumentMode;
  documentId: string;
}

export default function DocumentForm({ mode, documentId }: DocumentFormProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const isOrder = mode === 'order';

  // --- HANDLE CREATE INVOICE ---
  const handleCreateInvoice = async () => {
    setIsCreating(true);
    
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Invoice Created Successfully!");

    // REDIRECT to the new Invoice Page
    // This matches the folder structure: src/app/admin/invoices/[id]/page.tsx
    router.push('/admin/invoices/INV-2026-0001'); 
  };

  return (
    <div className="bg-[#121212] min-h-screen text-white font-sans p-6">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-[#E879F9] text-black px-4 py-1 rounded font-bold text-sm">New</div>
        <div className="flex gap-2">
           <button className="bg-green-600/20 p-1 rounded border border-green-600/50 text-green-500"><Check className="h-4 w-4"/></button>
           <button className="bg-red-600/20 p-1 rounded border border-red-600/50 text-red-500"><XIcon className="h-4 w-4"/></button>
        </div>
        <h1 className="text-2xl font-bold ml-4">{isOrder ? 'Rental Order' : 'Invoice Page'}</h1>
      </div>

      <div className="bg-[#1E1E1E] border border-gray-800 rounded-lg p-8">
        
        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-800">
          <div className="flex gap-2">
            <button className="px-6 py-2 bg-[#E879F9] hover:bg-[#D946EF] text-black rounded font-bold text-sm">Send</button>
            <button className="px-6 py-2 border border-gray-600 rounded text-sm font-medium">Confirm</button>
            <button className="px-6 py-2 border border-gray-600 rounded text-sm font-medium">Print</button>
            
            {/* THE REDIRECT BUTTON */}
            {isOrder && (
              <button 
                onClick={handleCreateInvoice}
                disabled={isCreating}
                className="px-6 py-2 bg-[#E879F9] hover:bg-[#D946EF] text-black rounded font-bold text-sm ml-4 flex items-center gap-2"
              >
                {isCreating && <Loader2 className="h-4 w-4 animate-spin"/>}
                Create Invoice
              </button>
            )}
          </div>

          {/* Status Pills */}
          <div className="flex bg-[#121212] rounded-md p-1 border border-gray-700">
            {isOrder ? (
              <>
                <button className="px-4 py-1.5 bg-gray-700 rounded-sm text-xs text-gray-300">Quotation</button>
                <button className="px-4 py-1.5 text-gray-500 text-xs">Quotation Sent</button>
                <button className="px-4 py-1.5 text-gray-500 text-xs">Sale Order</button>
              </>
            ) : (
              <>
                <button className="px-6 py-1.5 bg-gray-700 rounded-sm text-xs text-gray-300">Draft</button>
                <button className="px-6 py-1.5 text-gray-500 text-xs">Posted</button>
              </>
            )}
          </div>
        </div>

        {/* Form Body (Simplified for brevity) */}
        <h2 className="text-3xl font-bold mb-8 text-white">{documentId}</h2>
        <div className="grid grid-cols-2 gap-16 mb-8">
            <div className="space-y-4">
                <div className="flex items-center"><label className="w-32 text-gray-400 text-sm">Customer</label><input className="flex-1 bg-transparent border-b border-gray-700 outline-none"/></div>
                <div className="flex items-center"><label className="w-32 text-gray-400 text-sm">Address</label><input className="flex-1 bg-transparent border-b border-gray-700 outline-none"/></div>
            </div>
            <div className="space-y-4">
                <div className="flex items-center"><label className="w-32 text-gray-400 text-sm">Date</label><input type="date" className="flex-1 bg-transparent border-b border-gray-700 outline-none text-gray-400"/></div>
            </div>
        </div>
        
        {/* Placeholder for Lines */}
        <div className="border border-gray-700 h-32 rounded-lg flex items-center justify-center text-gray-500 mb-8">
           [ Product Lines Table ]
        </div>

        {/* Totals */}
        <div className="flex justify-end">
            <div className="w-64">
                <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-2">
                    <span>Total:</span>
                    <span>Rs 4,00,000</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}