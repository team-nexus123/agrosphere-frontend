import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
// --- New Auth Imports ---
import { AuthProvider } from './context/AuthContext'; 
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
// --- End New Auth Imports ---

import HomePage from './pages/HomePage';
import AgroChatPage from './pages/AgroChatPage';
import MarketplacePage from './pages/MarketplacePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationRouter from './pages/OrderConfirmationRouter';
import TraceableOrderPage from './pages/TraceableOrderPage';
import StandardOrderPage from './pages/StandardOrderPage'; 
import ExpertsPage from './pages/ExpertsPage';
import ExpertBookingPage from './pages/ExpertBookingPage'; 
import InvestmentPage from './pages/InvestmentPage'; 
import WalletPage from './pages/WalletPage';
// NOTE: Layout is not imported here, assuming it's used *inside* your page components or you will add a Layout component for the private routes later.

const AppRouter: React.FC = () => {
  return (
    // 1. Wrap the entire Router in the AuthProvider
    <AuthProvider>
      <Router>
        {/* 2. Wrap main features in the CartProvider */}
        <CartProvider>
          <Routes>
            {/* 3. Public Routes: Accessible without login */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* 4. Protected Routes: ALL other routes require login via PrivateRoute */}
            <Route element={<PrivateRoute />}>
              
              {/* Main User Flows */}
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<AgroChatPage />} />
              
              {/* Marketplace & E-commerce Flow */}
              <Route path="/marketplace" element={<MarketplacePage />} /> 
              <Route path="/cart" element={<CartPage />} /> 
              <Route path="/checkout" element={<CheckoutPage />} />
              
              {/* Order Confirmation Flow */}
              <Route path="/confirmation" element={<OrderConfirmationRouter />} /> 
              <Route path="/order/traceable" element={<TraceableOrderPage />} /> 
              <Route path="/order/standard" element={<StandardOrderPage />} /> 
              
              {/* Expert Consultation Flow */}
              <Route path="/experts" element={<ExpertsPage />} />
              <Route path="/experts/book" element={<ExpertBookingPage />} /> 
              
              {/* Farm Co-Ownership & Investment Flow */}
              <Route path="/invest" element={<InvestmentPage />} /> 
              
              {/* wallet */}
              <Route path="/wallet" element={<WalletPage />} />
            </Route>
            
            {/* Fallback 404 Route */}
            <Route path="*" element={
              <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
                <h1 className="text-4xl font-bold text-red-600 mb-4">404 | Page Not Found</h1>
                <p className="text-gray-700">The requested URL does not exist.</p>
                <Link to="/" className="mt-4 text-green-600 hover:text-green-800 font-medium">
                    Go Home
                </Link>
              </div>
            } />
          </Routes>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;