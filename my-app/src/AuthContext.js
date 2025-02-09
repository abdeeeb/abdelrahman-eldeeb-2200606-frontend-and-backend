import React, { createContext, useState, useContext } from 'react';

// Create authentication context
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);

  // Login function
  const login = (token, isAdmin) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdmin);
    setToken(token);
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
