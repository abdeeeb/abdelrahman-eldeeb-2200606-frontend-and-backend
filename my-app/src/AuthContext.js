import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

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

    // Remove authentication cookie from backend
    fetch('http://localhost:5555/user/logout', {
      method: 'POST',
      credentials: 'include' // Ensures cookies are sent
    }).then(() => {
      console.log('Logged out successfully');
    }).catch(err => console.error('Logout failed:', err));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
