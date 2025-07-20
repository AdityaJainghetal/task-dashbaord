import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize currentUser from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
    setCurrentUser(userData);
  };

  const loginAdmin = (adminData) => {
    localStorage.setItem('user', JSON.stringify(adminData));
    localStorage.setItem('token', adminData.token);
    setCurrentUser(adminData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        loginAdmin,
        logout,
        isAdmin: currentUser?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};