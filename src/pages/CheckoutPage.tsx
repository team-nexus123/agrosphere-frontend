import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  // Destructuring setTransaction from context is essential for the routing logic
  const { cart, cartCount, setTransaction } = useCart(); 
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'agrocoin' | 'naira' | 'card'>('agrocoin');
  
  // Calculate totals (including simulated logistics/delivery fees)
  const subtotalNaira = cart.reduce((sum, item) => sum + item.priceNaira * item.quantity, 0);
  const subtotalAgroCoin = cart.reduce((sum, item) => sum + item.priceAgroCoin * item.quantity, 0);
  const logisticsFeeNaira = cartCount > 0 ? 500 : 0; // Logistics and delivery service fees
  const logisticsFeeAgroCoin = cartCount > 0 ? 5 : 0;
  
  const totalNaira = subtotalNaira + logisticsFeeNaira;
  const totalAgroCoin = subtotalAgroCoin + logisticsFeeAgroCoin;

  const handlePlaceOrder = () => {
    // --- 1. Identify Traceable Items ---
    // SIMULATION LOGIC: Identify which items would be traceable (e.g., specific produce)
    const traceableItemsSummary = cart
      .filter(item => item.name.includes('Tomato') || item.name.includes('Potatoes')) 
      .map(item => ({
        name: item.name,
        // Mock a unique ID for each traceable item (Blockchain tracking ID)
        blockchainID: `TX${item.id}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      }));

    // --- 2. Set Transaction Data in Context ---
    // This data is retrieved by the OrderConfirmationRouter to decide the final success page
    setTransaction({
      totalNaira: totalNaira,
      // CRITICAL FLAG: Set this to determine routing
      hasTraceableGoods: traceableItemsSummary.length > 0,
      traceableItems: traceableItemsSummary,
    });

    // --- 3. Navigate to Confirmation Router (Loading Screen) ---
    navigate('/confirmation');
  };

  if (cartCount === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center p-10 h-screen text-center">
          <p className="text-4xl mb-4">🚫</p>
          <h2 className="text-xl font-bold text-gray-800">Cannot Checkout</h2>
          <p className="text-gray-500 mt-2">Your cart is empty. Please add items to proceed.</p>
          <Link to="/marketplace" className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Go to Marketplace
          </Link>
        </div>
        <MobileNavbar />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* 1. Header */}
      <header className="flex items-center p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md">
        <Link to="/cart" className="text-xl mr-3">
          {'<'} 
        </Link>
        <h1 className="text-lg font-semibold">Checkout</h1>
      </header>

      {/* 2. Scrollable Content Area */}
      <main className="grow overflow-y-auto p-4 space-y-5 pb-40"> 
        
        {/* --- A. Delivery Information --- */}
        <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
            <span>📍</span> <span>Delivery Address</span>
          </h2>
          <div className="text-sm space-y-1">
            <p className="font-semibold">Babatunde Agrosphere (Current User)</p>
            <p className="text-gray-600">Flat 3B, Innovation Hub, Lekki Phase 1, Lagos.</p>
            <p className="text-gray-600">080 XXX XXXX</p>
          </div>
          <button className="mt-3 text-sm font-medium text-blue-600 hover:underline">
            Change Address
          </button>
        </div>

        {/* --- B. Order Summary --- */}
        <div className="p-4 bg-green-50 rounded-xl shadow-md border border-green-300">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
            <span>📦</span> <span>Order Summary ({cartCount} Items)</span>
          </h2>
          <div className="text-sm space-y-1">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-700">
                <p>{item.name} (x{item.quantity})</p>
                <p>₦{item.priceNaira * item.quantity}</p>
              </div>
            ))}
            <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between">
              <p>Logistics & Delivery</p>
              <p className="font-semibold">₦{logisticsFeeNaira}</p>
            </div>
          </div>
        </div>

        {/* --- C. Payment Method (Highlighting AgroCoin) --- */}
        <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
            <span>💳</span> <span>Payment Method (AgroCoin)</span>
          </h2>
          
          [cite_start]{/* AgroCoin Option [cite: 42] */}
          <button 
            onClick={() => setPaymentMethod('agrocoin')} 
            className={`flex items-center justify-between w-full p-3 rounded-lg border-2 mb-2 transition-all ${
              paymentMethod === 'agrocoin' ? 'border-amber-500 bg-amber-50' : 'border-gray-300'
            }`}
          >
            <div className='flex items-center space-x-2'>
              <span className="text-xl">🟡</span>
              <p className='font-semibold'>AgroCoin (Web3 Token)</p>
            </div>
            {paymentMethod === 'agrocoin' && <span className="text-green-600 font-bold">✓ Selected</span>}
          </button>

          {/* Other Options */}
          <button 
            onClick={() => setPaymentMethod('card')} 
            className={`flex items-center justify-between w-full p-3 rounded-lg border-2 transition-all ${
              paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-300'
            }`}
          >
            <div className='flex items-center space-x-2'>
              <span className="text-xl">💵</span>
              <p className='font-semibold'>Card / Bank Transfer (Naira)</p>
            </div>
            {paymentMethod === 'card' && <span className="text-green-600 font-bold">✓ Selected</span>}
          </button>

          {/* Spacer to push content up if needed (ensures scrollability) */}
          <div className="h-4"/> 
        </div>
        
      </main>

      {/* 3. Fixed Footer: Grand Total and Place Order */}
      <div className="fixed bottom-16 w-full max-w-sm bg-white p-4 border-t border-gray-300 shadow-2xl z-20">
        <div className="flex justify-between items-center mb-3">
          <p className="text-md font-bold text-gray-700">Grand Total:</p>
          <div>
            <p className="text-2xl font-extrabold text-green-700">₦{totalNaira}</p>
            {paymentMethod === 'agrocoin' && (
              <p className="text-md font-bold text-amber-500 text-right">({totalAgroCoin} AC)</p>
            )}
          </div>
        </div>
        
        {/* Updated button to call handlePlaceOrder */}
        <button 
          onClick={handlePlaceOrder} 
          className="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-700 transition-colors"
        >
          Place Order & Pay {paymentMethod === 'agrocoin' ? '(Web3)' : ''}
        </button>
      </div>

      {/* 4. Mobile Navbar (Fixed at the absolute bottom) */}
      <MobileNavbar />
    </Layout>
  );
};

export default CheckoutPage;