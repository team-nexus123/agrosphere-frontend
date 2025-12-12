import React from 'react';

interface InvestmentCardProps {
  farmName: string;
  crop: string;
  investmentAmount: number; // The minimum investment slot
  returns: string;
  duration: string;
  status: 'Open' | 'Fully Funded' | 'Harvesting';
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  farmName,
  crop,
  investmentAmount,
  returns,
  duration,
  status,
}) => {
  const isAvailable = status === 'Open';

  return (
    <div className={`p-4 rounded-xl shadow-lg transition-all ${
      isAvailable ? 'bg-white border-2 border-green-400 hover:shadow-xl' : 'bg-gray-100 border border-gray-300 opacity-70'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{farmName}</h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
          isAvailable ? 'bg-green-600 text-white' : 'bg-gray-400 text-gray-800'
        }`}>
          {status}
        </span>
      </div>

      <p className="text-sm font-medium text-green-700 mb-3">{crop} Farm (New Opportunity)</p>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm border-t pt-3">
        <div>
          <p className="text-gray-500">Min. Slot (₦)</p>
          <p className="text-lg font-extrabold text-blue-600">₦{investmentAmount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Est. Returns</p>
          <p className="text-lg font-extrabold text-green-700">{returns}</p>
        </div>
        <div>
          <p className="text-gray-500">Duration</p>
          <p className="font-semibold">{duration}</p>
        </div>
        <div>
          <p className="text-gray-500">Transparency</p>
          <p className="font-semibold text-amber-500">Web3 Tracked</p>
        </div>
      </div>

      <button 
        className={`w-full mt-4 py-3 font-bold rounded-lg transition-colors shadow-md ${
          isAvailable 
            ? 'bg-amber-500 text-white hover:bg-amber-600' 
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
        disabled={!isAvailable}
      >
        {isAvailable ? 'Invest Now (₦)' : 'Fully Funded'}
      </button>
    </div>
  );
};

export default InvestmentCard;