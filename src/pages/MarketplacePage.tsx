import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import ProductCard from '../components/ProductCard';
import TraceabilityModal from '../components/TraceabilityModal';
import { useCart } from '../context/CartContext'; // <--- NEW IMPORT
import { Link } from 'react-router-dom'; // <--- REQUIRED for the cart icon

const MarketplacePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); 
  
  // Get cart state and functions from context
  const { cartCount, addItemToCart } = useCart(); // <--- USE CART CONTEXT

  // Sample data for the products (remains the same)
  const products = [
    { 
      id: 1, name: 'Organic Tomatoes', weight: '1kg', priceN: 800, priceAC: 8, imageUrl: '/assets/tomatoes.jpg', isTraceable: true,
      traceData: { 
        blockchainID: '0x1A2B3C4D5E6F7G8H9I0J', 
        impactScore: 'A+',
        production: [
            { label: 'Farm', value: 'Agrosphere Co-op Farm 007' },
            { label: 'Harvest Date', value: '2025-12-05' },
            { label: 'Expert Consulted', value: 'Yes (Agronomist Ada)' },
        ],
        logistics: [
            { label: 'Departure', value: '2025-12-09, 08:00 AM' },
            { label: 'Logistics Partner', value: 'Agrosphere Delivery' },
            { label: 'Temp (Transit)', value: '18°C' },
        ],
      }
    },
    { id: 2, name: 'Fresh Pepper Mix', weight: '1kg', priceN: 800, priceAC: 8, imageUrl: '/assets/pepper.jpg', isTraceable: false },
    { id: 3, name: 'Sweet Potatoes', weight: 'Bumper Bag', priceN: 800, priceAC: 8, imageUrl: '/assets/potatoes.jpg', isTraceable: true },
    { id: 4, name: 'Heirloom Tomato Seeds', weight: 'Starter Kit', priceN: 800, priceAC: 8, imageUrl: '/assets/seeds.jpg', isTraceable: false },
  ];

  const handleTraceClick = (product: any) => {
    setSelectedProduct(product.traceData);
    setIsModalOpen(true);
  };
  
  return (
    <Layout>
      {/* 1. Header - CART ICON UPDATED with counter and Link */}
      <header className="flex items-center justify-between p-4 bg-green-600 text-white sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold">Agrosphere Marketplace</h1>
        
        {/* Cart Icon with Counter and Link */}
        <Link to="/cart" className="relative p-2 hover:bg-green-700 rounded-full transition-colors">
            <span className="text-2xl">🛒</span>
            {/* Cart Counter Badge - ONLY SHOW IF COUNT > 0 */}
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-green-600">
                    {cartCount}
                </span>
            )}
        </Link>
      </header>

      {/* 2. Category Tabs (no change) */}
      <div className="flex justify-around p-2 bg-white sticky top-[68px] z-5 border-b border-gray-200">
        <button className="py-2 px-4 text-sm font-semibold text-green-700 border-b-2 border-green-700">
          Fresh Produce
        </button>
        <button className="py-2 px-4 text-sm text-gray-500 hover:text-green-600">
          Seeds & Tools
        </button>
        <button className="py-2 px-4 text-sm text-gray-500 hover:text-green-600">
          Expert Consultations
        </button>
      </div>

      {/* 3. Product Grid */}
      <main className="p-4 grid grid-cols-2 gap-4 mb-16">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product} // Pass the full product object
            weight={product.weight}
            imageUrl={product.imageUrl}
            isTraceable={product.isTraceable}
            onTraceClick={() => handleTraceClick(product)}
            onAddToCart={() => addItemToCart(product)} // <--- HOOKED UP ADD TO CART
          />
        ))}
      </main>

      {/* 4. Traceability Modal (no change) */}
      {selectedProduct && (
        <TraceabilityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productName={products.find(p => p.traceData === selectedProduct)?.name || 'Product'}
          blockchainID={selectedProduct.blockchainID}
          impactScore={selectedProduct.impactScore}
          productionDetails={selectedProduct.production}
          logisticsDetails={selectedProduct.logistics}
        />
      )}

      {/* 5. Mobile Navbar (no change) */}
      <MobileNavbar />
    </Layout>
  );
};

export default MarketplacePage;