'use client';

import React, { useEffect, useState } from 'react';
import { 
  Trash2, ChevronLeft, Calendar, X, Loader2, User, LogOut, Receipt, Tag, ArrowRight, CreditCard
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const supabase = createClient();
  
  // Data State
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [order, setOrder] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  
  // UI State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Coupon State
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Constants
  const GST_RATE = 0.18; 

  // --- FETCH CART FROM DB ---
  useEffect(() => {
    const fetchCart = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      const { data: orderData } = await supabase
        .from('rental_orders')
        .select('*')
        .eq('customer_id', user.id)
        .eq('status', 'draft')
        .maybeSingle();

      if (orderData) {
        setOrder(orderData);
        const { data: items } = await supabase
          .from('rental_order_items')
          .select('*')
          .eq('order_id', orderData.id);
        setCartItems(items || []);
      }
      setLoading(false);
    };

    fetchCart();
  }, [supabase, router]);

  // --- CALCULATIONS ---
  const calculateDays = () => {
    if (!order?.pickup_date || !order?.return_date) return 1; 
    const start = new Date(order.pickup_date);
    const end = new Date(order.return_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 ? diffDays : 1; 
  };

  const rentalDays = calculateDays();
  
  const baseTotal = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity * rentalDays);
  }, 0);

  const gstAmount = baseTotal * GST_RATE;
  
  // Final Total Calculation
  const finalTotal = Math.max(0, (baseTotal + gstAmount) - discountAmount);

  // --- HANDLERS ---
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) {
      toast.error("Please enter a code");
      return;
    }
    if (couponCode.toUpperCase() === 'GETOFF50') {
      setDiscountAmount(50);
      setAppliedCoupon('GETOFF50');
      setShowCouponInput(false);
      toast.success("Coupon Applied! Rs 50 OFF");
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountAmount(0);
    setAppliedCoupon(null);
    setCouponCode('');
    toast.success("Coupon Removed");
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase.from('rental_order_items').delete().eq('id', itemId);
    if (!error) {
      setCartItems(prev => prev.filter(i => i.id !== itemId));
      toast.success("Item removed");
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    if (order) {
       await supabase.from('rental_orders')
        .update({ 
          status: 'confirmed', 
          total_amount: finalTotal,
        })
        .eq('id', order.id);
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsCheckoutOpen(false);
    setCartItems([]);
    toast.success("Payment Successful! Order Confirmed.");
    router.push('/dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#121212] border-b border-gray-800 px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xs">YL</span>
              </div>
              <span className="font-bold text-lg tracking-wide">RentFlow</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => router.push('/dashboard')}
              className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors bg-[#1E1E1E] border border-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </button>
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:ring-2 hover:ring-purple-500 transition-all overflow-hidden">
                {avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" /> : <User className="h-5 w-5 text-gray-300" />}
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-[#1E1E1E] border border-gray-600 rounded-lg shadow-2xl z-50 overflow-hidden">
                   <div className="px-6 py-4 border-b border-gray-700"><p className="text-sm text-white font-bold">{user?.user_metadata?.full_name || 'User'}</p></div>
                   <button onClick={handleLogout} className="w-full flex items-center px-6 py-3 text-sm text-red-400 hover:bg-gray-800"><LogOut className="w-4 h-4 mr-3"/> Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="text-sm text-gray-400 mb-8 flex items-center">
          <span className="text-white font-semibold underline decoration-purple-500 underline-offset-4">Review Cart</span> 
          <span className="mx-3 text-gray-600">{'>'}</span> 
          <span>Address</span> 
          <span className="mx-3 text-gray-600">{'>'}</span> 
          <span>Payment</span> 
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Items Section */}
          <div className="flex-[2]">
            <h2 className="text-xl font-bold mb-8 flex items-center">
              Order Summary
              <span className="ml-auto text-sm font-normal text-gray-400">
                Duration: <span className="text-white font-bold">{rentalDays} Days</span>
              </span>
            </h2>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-20 bg-[#1E1E1E] rounded-xl border border-gray-800 text-gray-500">
                <p className="text-lg mb-4">Your cart is empty.</p>
                <button onClick={() => router.push('/dashboard')} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-colors">
                  Browse Equipment
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 p-6 bg-[#1E1E1E] rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                    <div className="w-24 h-24 bg-[#121212] rounded-lg overflow-hidden border border-gray-800 flex items-center justify-center flex-shrink-0">
                      <img 
                        src={`https://source.unsplash.com/random/200x200/?gadget&sig=${item.product_id}`} 
                        alt={item.product_name} 
                        className="w-full h-full object-cover opacity-80"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image'; }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-200">{item.product_name}</h3>
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {rentalDays} Day Rental
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">Rs {item.price * rentalDays}</p>
                          <p className="text-xs text-gray-500">Rs {item.price} x {rentalDays} days</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700/50">
                         <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                         <button onClick={() => removeFromCart(item.id)} className="hover:text-red-400 flex items-center transition-colors text-xs text-gray-500">
                          <Trash2 className="w-3 h-3 mr-1.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Billing Summary */}
          <div className="flex-1">
            <div className="bg-[#1E1E1E] p-8 rounded-2xl border border-gray-800 sticky top-28 shadow-xl">
              <h3 className="font-semibold mb-6 text-gray-200 flex items-center">
                Rental Period
              </h3>
              
              <div className="bg-[#121212] p-4 rounded-lg border border-gray-700 mb-8 space-y-4">
                 <div className="flex justify-between text-xs text-gray-400 items-center border-b border-gray-800 pb-2">
                    <span className="uppercase font-bold tracking-wider">Pickup</span>
                    <span className="text-white font-mono">{order ? new Date(order.pickup_date).toLocaleString() : '-'}</span>
                 </div>
                 <div className="flex justify-between text-xs text-gray-400 items-center pt-1">
                    <span className="uppercase font-bold tracking-wider">Return</span>
                    <span className="text-white font-mono">{order ? new Date(order.return_date).toLocaleString() : '-'}</span>
                 </div>
              </div>

              <div className="space-y-4 mb-8">
                 <div className="flex justify-between text-sm text-gray-400">
                    <span>Base Total ({rentalDays} Days)</span>
                    <span>Rs {baseTotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-sm text-gray-400">
                    <span>GST (18%)</span>
                    <span>Rs {gstAmount.toFixed(2)}</span>
                 </div>
                 {appliedCoupon && (
                   <div className="flex justify-between text-sm text-green-400 font-bold animate-in fade-in slide-in-from-right-2">
                      <span className="flex items-center"><Tag className="w-3 h-3 mr-1"/> Discount ({appliedCoupon})</span>
                      <span>- Rs {discountAmount.toFixed(2)}</span>
                   </div>
                 )}
              </div>

              <div className="pt-6 border-t border-gray-700 pb-8">
                <div className="flex justify-between items-end">
                  <span className="text-gray-300 font-medium">Grand Total</span>
                  <div className="text-right">
                     <span className="block text-3xl font-bold text-white">Rs {finalTotal.toFixed(2)}</span>
                     <span className="text-xs text-gray-500">Incl. of all taxes</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!appliedCoupon ? (
                  !showCouponInput ? (
                    <button onClick={() => setShowCouponInput(true)} className="w-full bg-[#064e18] hover:bg-[#086320] text-white font-bold py-3.5 rounded-lg border border-green-800 transition-all flex items-center justify-center">
                      Apply Coupon
                    </button>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2 animate-in fade-in slide-in-from-top-1">
                      <input 
                        type="text" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. GETOFF50"
                        className="flex-1 w-full bg-[#0a0a0a] border border-gray-700 rounded-lg py-3 px-4 text-white text-sm placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none uppercase font-mono tracking-wide transition-all"
                        autoFocus
                      />
                      <button type="submit" className="bg-green-700 hover:bg-green-600 text-white text-xs font-bold uppercase tracking-wider px-5 rounded-lg transition-all">Apply</button>
                      <button type="button" onClick={() => setShowCouponInput(false)} className="text-gray-500 hover:text-white px-2 transition-colors"><X className="w-5 h-5"/></button>
                    </form>
                  )
                ) : (
                  <div className="w-full bg-green-900/20 border border-green-800 rounded-lg py-3 px-4 flex justify-between items-center text-green-400">
                    <span className="text-sm font-bold flex items-center"><Tag className="w-4 h-4 mr-2"/> Coupon Applied</span>
                    <button onClick={handleRemoveCoupon} className="text-xs hover:text-white underline decoration-gray-500 hover:decoration-white transition-all">Remove</button>
                  </div>
                )}

                <button onClick={() => toast.success("Feature coming soon!")} className="w-full bg-[#121212] hover:bg-gray-900 border border-gray-600 text-white font-bold py-3.5 rounded-lg transition-all">
                  Pay with Save Card
                </button>

                <button onClick={() => setIsCheckoutOpen(true)} disabled={cartItems.length === 0} className="w-full bg-[#121212] hover:bg-gray-900 border border-gray-600 text-white font-bold py-3.5 rounded-lg disabled:opacity-50 transition-all">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EXPRESS CHECKOUT MODAL ================= */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-[#1E1E1E] w-full max-w-4xl rounded-xl border border-gray-800 relative animate-in zoom-in-95 shadow-2xl">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center px-8 py-5 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">Express Checkout</h2>
                <button type="button" onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handlePayment} className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Left Side: Form Fields */}
                <div className="space-y-6">
                  {/* Card Details */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Card Details</label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
                      <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#121212] border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all font-mono" />
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name</label>
                      <input required type="text" className="w-full bg-[#121212] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                      <input required type="email" className="w-full bg-[#121212] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all" />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Address</label>
                    <input required type="text" className="w-full bg-[#121212] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all mb-3" placeholder="Street Address" />
                    <input type="text" className="w-full bg-[#121212] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all" placeholder="Apartment, Suite, etc. (Optional)" />
                  </div>

                  {/* City, Zip, Country */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Zip Code</label>
                      <input required type="text" className="w-full bg-[#121212] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">City</label>
                      <input required type="text" className="w-full bg-[#121212] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Country</label>
                      <input required type="text" className="w-full bg-[#121212] border border-gray-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* Right Side: Mini Summary */}
                <div className="bg-[#121212] p-6 rounded-xl border border-gray-800 h-fit">
                  <h3 className="font-bold text-lg mb-4 text-gray-200">Payment Summary</h3>
                  <div className="space-y-3 mb-6 border-b border-gray-800 pb-6">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Total Amount</span>
                      <span>Rs {finalTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Secure Processing</span>
                      <span className="text-green-500">Free</span>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center">
                    {isProcessing ? <><Loader2 className="animate-spin h-5 w-5 mr-2"/> Processing...</> : `Pay Rs ${finalTotal.toFixed(2)}`}
                  </button>
                </div>

              </form>
           </div>
        </div>
      )}

    </div>
  );
}