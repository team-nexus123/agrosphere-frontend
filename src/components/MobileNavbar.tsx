import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // <--- NEW IMPORT: Link and useLocation

/**
 * The fixed bottom navigation bar shown in the mobile screenshot.
 */
const MobileNavbar: React.FC = () => {
  // Hook to get the current URL path for determining the active item
  const location = useLocation(); 

  // Define the navigation items and their target paths
  const navItems = [
    { name: 'Home', icon: '🏠', path: '/' },
    { name: 'Marketplace', icon: '🛒', path: '/marketplace' }, // <--- Target path is /marketplace
    { name: 'Experts', icon: '🧑‍🔬', path: '/experts' }, 
    { name: 'Wallet', icon: '💳', path: '/wallet' },
  ];

  return (
    // Fixed position at the bottom of the mobile container
    <nav className="fixed bottom-0 w-full max-w-sm bg-white border-t border-gray-200 z-10 shadow-[0_-4px_6px_-1px_rgb(0_0_0/0.05)]">
      <div className="flex justify-around h-16">
        {navItems.map((item) => {
          // Check if the current path matches the item's path
          const isActive = location.pathname === item.path; 

          return (
            <Link // <--- Changed from <a> to Link
              key={item.name}
              to={item.path} // <--- Link uses the path property
              className={`flex-1 flex flex-col items-center justify-center text-center transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-500' // Apply active styling
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium mt-0.5">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavbar;