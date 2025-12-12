import React from 'react';

// Update the props interface
interface ProductCardProps {
  product: { // Simplified product object for passing to handler
    id: number;
    name: string;
    priceN: number;
    priceAC: number;
  };
  weight: string;
  imageUrl: string;
  isTraceable: boolean;
  onTraceClick: () => void;
  onAddToCart: (product: any) => void; // <--- NEW PROP
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  weight, 
  imageUrl, 
  isTraceable, 
  onTraceClick, 
  onAddToCart // <--- RECEIVE HANDLER
}) => {
  // Destructure for easy access (avoid unused 'id')
  const { name, priceN: priceNaira, priceAC: priceAgroCoin } = product;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col">
      
      {/* Product Image and Traceability Badge (no change) */}
      <div className="relative h-32 w-full">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        {isTraceable && (
          <button 
            onClick={onTraceClick}
            className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md hover:bg-green-700 transition-colors"
            title="View Blockchain Traceability"
          >
            Traceable 🔗
          </button>
        )}
      </div>

      <div className="p-3 flex flex-col justify-between grow">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10">{name} ({weight})</h3>
        
        {/* Pricing (no change) */}
        <div className="mt-2">
          <p className="text-xs text-gray-500">₦{priceNaira} / {priceAgroCoin} AC</p>
          <p className="text-xl font-bold text-green-700">₦{priceNaira}</p>
          <span className="text-sm text-amber-500 font-medium">({priceAgroCoin} AgroCoin)</span>
        </div>

        {/* Action Button - UPDATED to call prop */}
        <button 
            onClick={() => onAddToCart(product)} // <--- CALL HANDLER WITH PRODUCT DATA
            className="mt-3 w-full py-2 text-sm bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors shadow-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;