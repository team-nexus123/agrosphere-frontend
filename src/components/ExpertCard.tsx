import React from 'react';
import { Link } from 'react-router-dom'; // <--- NEW IMPORT

interface ExpertCardProps {
  name: string;
  specialty: string;
  rating: number;
  rateAgroCoin: number;
  languages: string;
  imageUrl: string;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  name,
  specialty,
  rating,
  rateAgroCoin,
  languages,
  imageUrl,
}) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      
      {/* Profile Image (Placeholder) */}
      <div className="shrink-0">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
        />
      </div>

      {/* Expert Details */}
      <div className="ml-4 grow">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-green-700 font-semibold">{specialty}</p>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <span className="text-amber-400">⭐</span> {rating.toFixed(1)} &bull; {languages}
        </div>
      </div>

      {/* Booking and Rate (Paid with AgroCoin ) */}
      <div className="flex flex-col items-end shrink-0 ml-4">
        <p className="text-xl font-bold text-amber-500">{rateAgroCoin} AC</p>
        <p className="text-xs text-gray-500 mb-2">per consultation</p>
        
        {/* UPDATED: Changed button to Link for routing */}
        <Link 
            to="/experts/book" // Navigate to the Expert Booking Page
            className="px-4 py-2 text-sm bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md text-center"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ExpertCard;