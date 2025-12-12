import React from 'react';
import Layout from '../components/Layout';
import MobileNavbar from '../components/MobileNavbar';
import { Link } from 'react-router-dom'; // Keep this for the Agro-Chat link

// --- Reusable Component: Dashboard Card ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const DashboardCard: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-4 rounded-xl shadow-md ${className}`}>
    {children}
  </div>
);

// --- The Main Page Component ---

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* 1. Header (Agrosphere Logo & Voice) - NAME UPDATED */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          {/* Logo/Icon Placeholder */}
          <span className="text-2xl text-green-600">🌱</span> 
          <h1 className="text-xl font-bold text-gray-800">Agrosphere</h1> {/* <--- NAME CHANGE APPLIED */}
        </div>
        <button aria-label="Voice Command" className="text-gray-500 hover:text-green-600 transition-colors p-2 rounded-full bg-gray-100">
          {/* Microphone Icon Placeholder */}
          <span className="text-lg">🎙️</span> 
        </button>
      </header>

      <main className="p-4 space-y-5 mb-20"> 
        
        {/* --- A. AI-Powered Companion Card (UPDATED) --- */}
        <DashboardCard className="bg-amber-100 border-2 border-amber-300">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">AI Farming Advisor (Agro-Chat)</h2>
          <div className="flex flex-col items-center justify-center p-6 bg-white/70 rounded-lg space-y-3">
            {/* Chatbot Icon Placeholder */}
            <span className="text-4xl text-amber-500">🤖</span> 
            <p className="text-sm text-gray-600 font-medium text-center">Get intelligent crop recommendations, disease advice, and planning assistance instantly.</p>
            
            {/* LINK to the chat page */}
            <Link 
                to="/chat" // <--- This defines the target path/route
                className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-colors text-center"
            >
              Start Chat / Ask Advisor
            </Link>
          </div>
        </DashboardCard>

        {/* --- B. Farm Co-Ownership Card (Green Theme) --- */}
        <DashboardCard className="bg-green-50 border-2 border-green-300">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <span>💰</span>
                <span>Farm Co-Ownership</span>
            </h2>
            {/* Use Link component for Farm Co-Ownership page */}
            <Link to="/invest" className="text-sm font-semibold text-green-600 hover:underline"> 
                View Farms
            </Link>
          </div>
          <div className="mt-2 text-gray-600">
            <p className="text-2xl font-bold text-green-700">₦8,500</p>
            <p className="text-sm">Invested (15% Est. Return after harvest)</p>
          </div>
        </DashboardCard>

        {/* --- C. Mini-Farm Tasks List (Reminders) --- */}
        <DashboardCard className="bg-white border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">✅ Your Mini-Farm Tasks</h2>
          {/* Automated reminders for watering, fertilizing, spraying, harvesting, etc. [cite: 29] */}
          <ul className="space-y-3">
            <li className="flex items-start space-x-2 text-gray-700">
              <span className="text-green-500 text-lg">☑️</span>
              <p>Water Container Tomatoes</p>
            </li>
            <li className="flex items-start space-x-2 text-gray-700">
              <span className="text-green-500 text-lg">☑️</span>
              <p>Apply Herebicide (Reminder) </p>
            </li>
            <li className="flex items-start space-x-2 text-gray-700 opacity-60">
              <span className="text-gray-400 text-lg">☐</span>
              <p>Check Soil pH for Corn</p>
            </li>
          </ul>
        </DashboardCard>

        {/* --- D. Educational Content Hub [cite: 74] --- */}
        <DashboardCard className="bg-blue-50 border-2 border-blue-300">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span>📚</span>
                <span>Learn & Grow</span>
            </h2>
            <p className="text-sm text-gray-600 mb-3">
                This hub features short videos in Nigerian languages [cite: 75], beginner-friendly guides [cite: 76], and region-specific farming tips[cite: 77].
            </p>
            <div className="grid grid-cols-2 gap-3">
                <button className="py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    Beginner Guides
                </button>
                <button className="py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    Watch Videos
                </button>
            </div>
        </DashboardCard>
        
      </main>

      {/* 3. The Mobile Navbar (Fixed at Bottom) */}
      <MobileNavbar />
    </Layout>
  );
};

export default HomePage;