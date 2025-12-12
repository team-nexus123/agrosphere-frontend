import React from 'react';

interface TraceabilityModalProps {
  productName: string;
  blockchainID: string;
  impactScore: string;
  productionDetails: { label: string; value: string; }[];
  logisticsDetails: { label: string; value: string; }[];
  isOpen: boolean;
  onClose: () => void;
}

const TraceabilityModal: React.FC<TraceabilityModalProps> = ({
  productName,
  blockchainID,
  impactScore,
  productionDetails,
  logisticsDetails,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const DetailSection: React.FC<{ title: string; details: { label: string; value: string; }[] }> = ({ title, details }) => (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
      <h4 className="text-md font-bold text-gray-700 mb-2 border-b pb-1">{title}</h4>
      <dl className="space-y-1">
        {details.map((detail, index) => (
          <div key={index} className="flex justify-between text-sm">
            <dt className="text-gray-600">{detail.label}</dt>
            <dd className="font-medium text-gray-800">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    // Fixed overlay for the modal background
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      
      {/* Modal Content - Constrained to mobile layout */}
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-[90%] max-h-[90%] overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="p-4 border-b bg-green-600 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Agro-Trace Scorecard</h2>
          <button onClick={onClose} className="text-2xl font-semibold hover:text-gray-200">
            &times;
          </button>
        </header>

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto flex-1">
          <h3 className="text-2xl font-extrabold text-green-700 mb-2">{productName}</h3>
          
          {/* Blockchain ID */}
          <div className="bg-amber-100 p-2 rounded-lg text-sm text-gray-700 font-mono break-all">
            <span className="font-semibold">Tx ID:</span> {blockchainID}
          </div>

          {/* Impact Score */}
          <div className="mt-4 p-3 bg-blue-100 rounded-lg text-center">
            <p className="text-lg font-bold text-blue-700">Sustainability Impact Score:</p>
            <p className="text-4xl font-extrabold text-blue-600">{impactScore}</p>
            <p className="text-sm text-gray-600">(Aligned with SDG 2: Zero Hunger & SDG 13: Climate Action )</p>
          </div>

          {/* Production Details */}
          <DetailSection title="Farm & Production Details (Immutable)" details={productionDetails} />

          {/* Logistics Details */}
          <DetailSection title="Logistics & Delivery" details={logisticsDetails} />

        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50">
          <button onClick={onClose} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">
            Close Scorecard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraceabilityModal;