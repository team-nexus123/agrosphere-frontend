import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const OrderConfirmationPage: React.FC = () => {
  // Retrieve the necessary state and functions from the CartContext
  const { clearCart, transaction } = useCart(); 
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  
  // State to hold the final display data
  const [orderNairaTotal, setOrderNairaTotal] = useState(0);
  const [traceableItems, setTraceableItems] = useState<{name: string, blockchainID: string}[]>([]);


  useEffect(() => {
    // 1. Safety check: if no transaction data exists (e.g., direct URL access), redirect.
    if (!transaction) {
        navigate('/');
        return;
    }
    
    // 2. Set the data from the context state
    setOrderNairaTotal(transaction.totalNaira);
    setTraceableItems(transaction.traceableItems);

    // 3. Simulate web3 transaction finalization 
    // INCREASED TIMEOUT to 1500ms (1.5s) to guarantee loading screen display.
    const timer = setTimeout(() => {
        // Clear the cart state after 'successful' transaction
        clearCart(); 
        
        setLoading(false);
    }, 1500); // <--- LOGIC UPDATE: Increased time to 1.5 seconds

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer); 

  }, [transaction, navigate, clearCart]); // Dependency array ensures correct hooks behavior

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <p className="text-4xl animate-spin">⚙️</p>
          <h2 className="text-xl font-bold text-gray-800 mt-4">Processing Web3 Payment...</h2>
          <p className="text-gray-500 mt-2">Finalizing AgroCoin transfer on the blockchain.</p>
        </div>
      </Layout>
    );
  }

  // --- Conditional logic for Blockchain tracking ---
  const hasTraceableItems = traceableItems.length > 0;

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
            <p className="text-4xl font-extrabold text-green-800">₦{orderNairaTotal.toLocaleString()}</p>
        </div>

        {/* --- CONDITIONAL BLOCKCHAIN SECTION (HACKATHON FOCUS) --- */}
        {hasTraceableItems ? (
            <div className="p-4 bg-amber-100 rounded-xl shadow-md border border-amber-300 text-left space-y-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                    <span>🔗</span> <span>Web3 Traceability Report ({traceableItems.length} Item{traceableItems.length > 1 ? 's' : ''})</span>
                </h3>
                <p className="text-sm text-gray-700">Your selected products have immutable blockchain tracking, ensuring trust and safety.</p>
                
                {traceableItems.map((item, index) => (
                    <div key={index} className="border-t border-amber-200 pt-2">
                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                        <div className="font-mono text-xs p-1 bg-amber-50 rounded break-all mt-0.5">
                           ID: {item.blockchainID}
                        </div>
                    </div>
                ))}
                <Link to="#" className="mt-3 block text-sm font-medium text-blue-600 hover:underline">
                    View Full Traceability DApp
                </Link>
            </div>
        ) : (
             <div className="p-4 bg-gray-100 rounded-xl shadow-md border border-gray-300 text-left space-y-2">
                <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                    <span>📦</span> <span>Order Summary & Tracking</span>
                </h3>
                <p className="text-sm text-gray-700">This order contains no traceable products. Delivery will be tracked via standard logistics.</p>
            </div>
        )}
        {/* --- END CONDITIONAL BLOCK --- */}


        {/* Delivery Timeline */}
        <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 text-left">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delivery Timeline</h3>
            <p className="text-gray-700">Estimated delivery is tomorrow, 10 AM - 1 PM.</p>
            <Link to="/" className="mt-3 block text-sm font-medium text-blue-600 hover:underline">
                View Live Logistics Map
            </Link>
        </div>

      </main>

      {/* 3. Footer Navigation */}
      <div className="fixed bottom-0 w-full max-w-sm bg-white p-4 border-t border-gray-300 shadow-2xl z-20">
        <Link to="/" className="w-full block text-center py-4 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors">
          Return to Dashboard
        </Link>
      </div>

      {/* 4. Mobile Navbar */}
      <MobileNavbar />
    </Layout>
  );
};

export default OrderConfirmationPage;