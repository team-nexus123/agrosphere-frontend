import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

// Define the shape of the data managed by the context
interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; name: string; email: string } | null;
  login: (email: string, token: string) => void;
  logout: () => void;
  signup: (userData: any) => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component to wrap the entire app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use a local storage check for persistent login during development
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('userToken')
  );
  const [user, setUser] = useState<AuthContextType['user']>(null);

  // --- Functions to be updated with backend API calls ---

  const login = (email: string, token: string) => {
    // 1. **Future Step:** Call backend login API
    // 2. Save token and user info
    localStorage.setItem('userToken', token);
    setIsAuthenticated(true);
    // Dummy user data for now
    setUser({ id: '1', name: 'Agro User', email }); 
  };

  const logout = () => {
    // 1. **Future Step:** Call backend logout API (optional)
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  const signup = (userData: any) => {
    // 1. **Future Step:** Call backend signup API
    console.log('Signup data submitted:', userData);
    // For now, let's auto-login after a dummy signup (in a real app, you'd navigate to login)
    login(userData.email, 'DUMMY_TOKEN_FROM_SIGNUP');
  };
  
  // --- End of API functions ---

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};