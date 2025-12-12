import React from 'react';
import type { ReactNode } from 'react';

// Define the Props interface for type safety
interface LayoutProps {
  children: ReactNode;
}

/**
 * A layout component that wraps the entire application content.
 * It centers the content and constrains it to a max-width typical of a mobile device.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // Outer container for the full screen/page, setting a light gray background
    <div className="min-h-screen bg-gray-50 flex justify-center">
      {/* Inner container simulating a mobile screen: 
        Max-width of 420px (iPhone Plus size) and rounded corners for a device-like feel.
        The content scrolls within this container.
      */}
      <div className="w-full max-w-sm bg-white shadow-xl overflow-hidden md:rounded-xl">
        {children}
      </div>
    </div>
  );
};

export default Layout;