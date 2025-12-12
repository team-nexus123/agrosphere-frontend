import React, { useState } from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
// 1. IMPORT THE AGROCOIN IMAGE
import AgroCoinIcon from '../assets/agrocoin.jpg';


const WalletPage: React.FC = () => {
  // Mock Balances (Use actual state management in a real app)
  const [nairaBalance, setNairaBalance] = useState(15000);
  const [agroCoinBalance, setAgroCoinBalance] = useState(150);
  
  // Mock conversion rate
  const AC_TO_NAIRA_RATE = 100; // 1 AC = ₦100
  const AC_TO_ETH_RATE = 0.0001; // 1 AC = 0.0001 ETH (Mock Rate)

  // State for the purchase input
  const [nairaPurchaseAmount, setNairaPurchaseAmount] = useState(1000);
  
  // State for the Web3 conversion input
  const [acConversionAmount, setAcConversionAmount] = useState(10);
  const ethOutput = (acConversionAmount * AC_TO_ETH_RATE).toFixed(4);

  const handleNairaPurchase = () => {
    if (nairaPurchaseAmount > nairaBalance) {
      alert("Insufficient Naira balance for this purchase!");
      return;
    }
    // Simulation: Deduct Naira, Add AgroCoin
    const acBought = nairaPurchaseAmount / AC_TO_NAIRA_RATE;
    setNairaBalance(prev => prev - nairaPurchaseAmount);
    setAgroCoinBalance(prev => prev + acBought);
    alert(`Successfully purchased ${acBought} AC!`);
  };

  const handleWeb3Convert = () => {
    if (acConversionAmount > agroCoinBalance) {
      alert("Insufficient AgroCoin balance for this conversion!");
      return;
    }
    // Simulation: Deduct AgroCoin, Show success modal (not implemented here)
    setAgroCoinBalance(prev => prev - acConversionAmount);
    
    alert(`Simulation Success! Converted ${acConversionAmount} AC to ${ethOutput} ETH. Please check your external wallet (Metamask/Bitget).`);
  };


  return (
    <Layout>
      {/* 1. Header */}
      <header className="flex items-center justify-between p-4 bg-gray-900 text-white sticky top-0 z-10 shadow-md">
        <h1 className="text-xl font-bold">Agrosphere Wallet 💳</h1>
        <button className="text-sm px-3 py-1 bg-green-600 rounded-full hover:bg-green-700">
          Settings
        </button>
      </header>

      {/* 2. Main Scrollable Content Area */}
      <main className="grow overflow-y-auto p-4 space-y-5 pb-20">
        
        {/* --- A. Balances & Summary --- */}
        <div className="p-4 bg-green-700 rounded-xl shadow-lg text-white space-y-3">
          <h2 className="text-lg font-semibold">My Current Balances</h2>
          <div className="grid grid-cols-2 gap-4 border-t border-green-600 pt-3">
            <div>
              <p className="text-sm opacity-80">Nigerian Naira (NGN)</p>
              <p className="text-2xl font-extrabold">₦{nairaBalance.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">AgroCoin (AC)</p>
              {/* 2. UPDATED LINE: Added Flexbox for alignment and the image */}
              <div className="flex items-center space-x-2"> 
                <p className="text-2xl font-extrabold text-amber-300">{agroCoinBalance.toLocaleString()}</p>
                <img 
                  src={AgroCoinIcon} 
                  alt="AgroCoin" 
                  className="h-6 w-6 rounded-full object-cover" // Added styling for size and shape
                />
                <p className="text-2xl font-extrabold text-amber-300">AC</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- B. Purchase AgroCoin (Web2 to Web3 Bridge) --- */}
        <div className="p-4 bg-white rounded-xl shadow-md border-2 border-green-300">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
            <span>➡️</span> <span>Buy AgroCoin (Bank Transfer)</span>
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Fund your Agrosphere activities by converting Naira to AgroCoin.
          </p>
          <div className="space-y-3">
            <input
              type="number"
              value={nairaPurchaseAmount}
              onChange={(e) => setNairaPurchaseAmount(Number(e.target.value))}
              placeholder="Naira Amount"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              min="100"
            />
            <div className="text-sm text-gray-700 font-medium">
              You will receive: <span className="text-green-600 font-extrabold">{(nairaPurchaseAmount / AC_TO_NAIRA_RATE).toFixed(0)} AC</span>
            </div>
            <button 
              onClick={handleNairaPurchase}
              className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
            >
              Convert ₦{nairaPurchaseAmount.toLocaleString()} to AC
            </button>
          </div>
        </div>
        
        {/* --- C. Web3 Conversion Bridge (Hackathon Edge) --- */}
        <div className="p-4 bg-amber-50 rounded-xl shadow-md border-2 border-amber-300">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center space-x-2">
            <span>🔗</span> <span>Convert AC to Ethereum (Web3 Bridge)</span>
          </h2>
          <p className="text-sm text-gray-700 mb-3">
            Bridge your AgroCoin to ETH via Bitget, Metamask, or Binance, leveraging our Web3 integration.
          </p>
          <div className="space-y-3">
            <input
              type="number"
              value={acConversionAmount}
              onChange={(e) => setAcConversionAmount(Number(e.target.value))}
              placeholder="AgroCoin Amount"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
              min="1"
            />
            <div className="text-sm text-gray-700 font-medium">
              You will receive: <span className="text-blue-600 font-extrabold">{ethOutput} ETH</span>
            </div>
            
            <div className="flex justify-between space-x-2">
              <button className="flex-1 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg">
                Metamask
              </button>
              <button className="flex-1 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg">
                Bitget
              </button>
              <button className="flex-1 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg">
                Binance
              </button>
            </div>

            <button 
              onClick={handleWeb3Convert}
              className="w-full py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600"
            >
              Bridge {acConversionAmount} AC to ETH
            </button>
          </div>
        </div>
        
        {/* --- D. Transaction History --- */}
        <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Transaction History</h2>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-green-600 font-medium">Deposit: ₦5,000</span>
              <span className="text-gray-500">Dec 10, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-600 font-medium">Spent: 8 AC (Tomatoes)</span>
              <span className="text-gray-500">Dec 11, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600 font-medium">Converted: 50 AC to ETH</span>
              <span className="text-gray-500">Dec 12, 2025</span>
            </div>
          </div>
          <button className="mt-3 text-sm font-medium text-blue-600 hover:underline">
            View All
          </button>
        </div>
        
      </main>

      {/* 3. Mobile Navbar */}
      <MobileNavbar />
    </Layout>
  );
};

export default WalletPage;