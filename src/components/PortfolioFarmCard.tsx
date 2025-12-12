import React from 'react';
import { Link } from 'react-router-dom';

interface PortfolioFarmCardProps {
  farmName: string;
  location: string;
  amountInvested: number;
  expectedReturn: string;
  daysToHarvest: number;
}

const PortfolioFarmCard: React.FC<PortfolioFarmCardProps> = ({
  farmName,
  location,
  amountInvested,
  expectedReturn,
  daysToHarvest,
}) => {
  // Mock calculation for progress and current return
  const progressPercent = Math.min(100, Math.round(100 * (120 - daysToHarvest) / 120)); // Assume 120-day cycle
  const currentReturnNaira = Math.round(amountInvested * (0.01 * progressPercent)); // 1% simulated progress return

  return (
    <Link 
      to="/invest/details/1" // Link to a detail page (placeholder)
      className="block p-4 bg-white rounded-xl shadow-md border-l-4 border-amber-500 transition-all hover:shadow-lg hover:bg-gray-50"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{farmName}</h3>
          <p className="text-xs text-gray-500">{location}</p>
        </div>
        <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
          {daysToHarvest} Days Left
        </span>
      </div>

      {/* Progress Bar and Metrics */}
      <div className="mt-3">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Progress: {progressPercent}% Funded
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Financials */}
      <div className="mt-3 grid grid-cols-3 text-sm border-t pt-2">
        <div>
          <p className="text-gray-500">Invested</p>
          <p className="font-bold text-blue-600">₦{amountInvested.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Current Return</p>
          <p className="font-bold text-green-700">₦{currentReturnNaira.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Est. Final</p>
          <p className="font-bold">{expectedReturn}</p>
        </div>
      </div>
    </Link>
  );
};

export default PortfolioFarmCard;