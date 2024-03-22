import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const token = localStorage.getItem('token') || '';
    const  userId= localStorage.getItem('userId') || '';
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; 

    return {
      isLoggedIn,
      token,
      userId,
      isAdmin,
      isGuest: !isLoggedIn,

    };
  });

  useEffect(() => {
    if (!authState.isLoggedIn && authState.isGuest) {
      generateGuestToken();
    }
  }, [authState.isLoggedIn, authState.isGuest]);

  const login = (userToken, userId, isAdmin) => {

    
    setAuthState({ 
      isLoggedIn: true, 
      token: userToken, 
      userId,
      isAdmin,
      isGuest: false 
      
      
      });
    
    localStorage.setItem('isLoggedIn', 'true'); // Set Log in state
    localStorage.setItem('token', userToken); // Store the authToken
    localStorage.setItem('userId', userId); // Store the userId
    localStorage.setItem('isAdmin', isAdmin.toString()); // Ensure isAdmin is stored as a string
    return Promise.resolve(userToken); 
  };


  

  const logout = () => {
    setAuthState({ isLoggedIn: false, token: '', userId: '', isAdmin: false, isGuest: true }); // Reset isAdmin on logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Clear userId from localStorage
    localStorage.removeItem('isAdmin'); // Clear isAdmin from localStorage

    generateGuestToken();
  };

  const generateGuestToken = async () => {
    try {
      const { data } = await axios.get('https://peak-threads.onrender.com/auth/generate-guest-token');
      setAuthState((prevState) => ({
        ...prevState,
        token: data.guestToken,
        isGuest: true,
      }));
    } catch (error) {
      console.error('Failed to generate guest token:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
