import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const StandardOrderPage: React.FC = () => {
  const { clearCart, transaction } = useCart();
  
  // Clear the cart state immediately upon loading this page
  useEffect(() => {
    // We only clear the cart and transaction data if it exists.
    if (transaction) {
      clearCart();
    }
  }, [clearCart, transaction]);

  // Handle case where transaction data is missing (should be prevented by the router)
  if (!transaction) {
    return (
        <Layout>
            <h1 className="text-center p-4">Error: Order details missing.</h1>
            <MobileNavbar />
        </Layout>
    );
  }

  return (
    <Layout>
      {/* 1. Header (Simple) */}
      <header className="p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md">
        <h1 className="text-lg font-semibold text-center">Order Placed!</h1>
      </header>

      {/* 2. Success and Summary */}
      <main className="grow overflow-y-auto p-6 space-y-6 text-center pb-24">
        
        {/* Success Icon */}
        <div className="flex flex-col items-center justify-center">
            <span className="text-6xl text-green-500">✅</span>
            <h2 className="text-3xl font-extrabold text-green-700 mt-2">Payment Successful!</h2>
            <p className="text-gray-600 mt-1">Your order has been confirmed.</p>
        </div>
        
        {/* Order Details Card */}
        <div className="p-4 bg-green-50 rounded-xl shadow-lg border border-green-300 space-y-3">
            <p className="text-sm text-gray-700 font-medium">Total Amount Paid:</p>
            <p className="text-4xl font-extrabold text-green-800">₦{transaction.totalNaira.toLocaleString()}</p>
        </div>

        {/* --- STANDARD ORDER BLOCK --- */}
        <div className="p-4 bg-gray-100 rounded-xl shadow-md border border-gray-300 text-left space-y-2">
            <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                <span>📦</span> <span>Order Tracking Details</span>
            </h3>
            <p className="text-sm text-gray-700">This order is being processed and will be delivered using standard Agrosphere logistics.</p>
            <div className="font-mono text-xs p-1 bg-gray-50 rounded break-all mt-0.5">
                Tracking ID: AGRO-STD-ORD-{Math.random().toString(36).substring(2, 10).toUpperCase()}
            </div>
        </div>
        {/* --- END STANDARD ORDER BLOCK --- */}


        {/* Delivery Timeline */}
        <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 text-left">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delivery Timeline</h3>
            <p className="text-gray-700">Estimated delivery is tomorrow, 10 AM - 1 PM.</p>
            <Link to="/" className="mt-3 block text-sm font-medium text-blue-600 hover:underline">
                View Estimated Route
            </Link>
        </div>

      </main>

      {/* 3. Footer Navigation */}
      <div className="fixed bottom-0 w-full max-w-sm bg-white p-4 border-t border-gray-300 shadow-2xl z-20">
        <Link to="/" className="w-full block text-center py-4 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors">
          Return to Dashboard
        </Link>
      </div>

      <MobileNavbar />
    </Layout>
  );
};

export default StandardOrderPage;