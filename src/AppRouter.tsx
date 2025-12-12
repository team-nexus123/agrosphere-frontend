import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import HomePage from './pages/HomePage';
import AgroChatPage from './pages/AgroChatPage';
import MarketplacePage from './pages/MarketplacePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationRouter from './pages/OrderConfirmationRouter';
import TraceableOrderPage from './pages/TraceableOrderPage';
import StandardOrderPage from './pages/StandardOrderPage'; 
import ExpertsPage from './pages/ExpertsPage';
import ExpertBookingPage from './pages/ExpertBookingPage'; // <--- NEW IMPORT: Expert Booking Page
import InvestmentPage from './pages/InvestmentPage'; // <--- NEW IMPORT: Investment Page
import WalletPage from './pages/WalletPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
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
          <Route path="/experts/book" element={<ExpertBookingPage />} /> {/* <--- EXPERT BOOKING ROUTE ADDED */}
          
          {/* Farm Co-Ownership & Investment Flow */}
          <Route path="/invest" element={<InvestmentPage />} /> {/* <--- INVESTMENT ROUTE ADDED */}
          
          {/* wallet */}
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="*" element={
              <div className="flex justify-center items-center h-screen">
                  <p>404 | Page Not Found</p>
              </div>
          } />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default AppRouter;