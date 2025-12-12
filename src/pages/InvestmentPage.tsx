import React from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { Link } from 'react-router-dom';
import InvestmentCard from '../components/InvestmentCard'; // For New Opportunities
import PortfolioFarmCard from '../components/PortfolioFarmCard'; // For Active Farms

const InvestmentPage: React.FC = () => {
  // --- A. Mock Data for Portfolio Farms ---
  const activeInvestments = [
    {
      farmName: 'Kano Tomato Enterprise',
      location: 'Kano, NG',
      amountInvested: 5000,
      expectedReturn: '15%',
      daysToHarvest: 30, // 30 days remaining
    },
    {
      farmName: 'Lagos Poultry Broilers',
      location: 'Ikorodu, Lagos',
      amountInvested: 3500,
      expectedReturn: '12%',
      daysToHarvest: 10, // 10 days remaining
    },
  ];

  // --- B. Mock Data for New Opportunities (Using existing InvestmentCard data) ---
  const newOpportunities = [
    {
      farmName: 'Ibadan Cassava Project',
      crop: 'Cassava',
      investmentAmount: 10000,
      returns: '20%',
      duration: '6 Months',
      status: 'Open' as const,
    },
    {
      farmName: 'Abuja Maize Field',
      crop: 'Maize',
      investmentAmount: 15000,
      returns: '18%',
      duration: '5 Months',
      status: 'Open' as const,
    },
  ];

  // --- C. User Summary Data ---
  const totalInvested = activeInvestments.reduce((sum, farm) => sum + farm.amountInvested, 0);
  const totalFarms = activeInvestments.length;
  
  return (
    <Layout>
      {/* 1. Header (Blue theme for Finance/Investment) */}
      <header className="flex flex-col p-4 bg-blue-600 text-white sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
            <Link to="/" className="text-xl mr-3">
                {'<'} 
            </Link>
            <h1 className="text-xl font-bold">Investment Dashboard</h1>
            <span className="text-2xl">💰</span>
        </div>
        <p className="text-sm opacity-90 mt-2">Grow your wealth through transparent, Web3-tracked farm co-ownership.</p>
      </header>
      
      {/* 2. User Investment Summary */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-gray-800">Your Portfolio Summary</h2>
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                AgroChampion [cite: 86]
            </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-sm text-gray-500">Total Capital Invested</p>
                <p className="text-2xl font-extrabold text-blue-600">₦{totalInvested.toLocaleString()}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">Active Farms</p>
                <p className="text-2xl font-extrabold text-green-700">{totalFarms}</p>
            </div>
        </div>
      </div>

      {/* 3. Main Scrollable Content Area */}
      <main className="p-4 space-y-6 mb-20">
        
        {/* --- A. My Active Farms --- */}
        <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">My Active Co-Ownerships</h2>
            <div className="space-y-4">
                {activeInvestments.map((farm, index) => (
                    <PortfolioFarmCard key={index} {...farm} />
                ))}
            </div>
        </section>

        {/* --- B. New Investment Opportunities --- */}
        <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">New Opportunities</h2>
            <div className="space-y-4">
                {newOpportunities.map((farm, index) => (
                    <InvestmentCard key={index} {...farm} />
                ))}
            </div>
        </section>
        
      </main>

      {/* 4. Mobile Navbar */}
      <MobileNavbar />
    </Layout>
  );
};

export default InvestmentPage;