import React from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, cartCount } = useCart();
  
  // Calculate total Naira and AgroCoin for the summary
  const totalNaira = cart.reduce((sum, item) => sum + item.priceNaira * item.quantity, 0);
  const totalAgroCoin = cart.reduce((sum, item) => sum + item.priceAgroCoin * item.quantity, 0);

  return (
    <Layout>
      {/* Header with Back Button */}
      <header className="flex items-center p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md">
        <Link to="/marketplace" className="text-xl mr-3">
          {'<'} 
        </Link>
        <h1 className="text-lg font-semibold">Your Cart ({cartCount} Items)</h1>
      </header>

      <main className="p-4 space-y-4 mb-20">
        
        {/* Empty Cart State */}
        {cartCount === 0 && (
          <div className="text-center p-10 bg-gray-50 rounded-xl mt-5">
            <p className="text-4xl mb-4">🛒</p>
            <h2 className="text-xl font-bold text-gray-800">Your Cart is Empty</h2>
            <p className="text-gray-500 mt-2">Find traceable fresh produce and tools in the Marketplace!</p>
            <Link to="/marketplace" className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Go to Marketplace
            </Link>
          </div>
        )}

        {/* Cart Items List */}
        {cart.length > 0 && (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-white border rounded-lg shadow-sm">
                <div className="grow">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700">₦{item.priceNaira * item.quantity}</p>
                  <p className="text-sm text-amber-500">{item.priceAgroCoin * item.quantity} AC</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Totals and Checkout Button */}
        {cartCount > 0 && (
          <div className="p-4 bg-green-50 rounded-xl border-2 border-green-300">
            <div className="flex justify-between text-lg font-semibold text-gray-800 mb-2">
              <span>Subtotal:</span>
              <span>₦{totalNaira}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-amber-600 mb-4">
              <span>Total AgroCoin:</span>
              <span>{totalAgroCoin} AC</span>
            </div>
            
            {/* UPDATED: Changed button to Link to go to checkout page */}
            <Link 
              to="/checkout"
              className="w-full block text-center py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors shadow-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}

      </main>

      <MobileNavbar />
    </Layout>
  );
};

export default CartPage;