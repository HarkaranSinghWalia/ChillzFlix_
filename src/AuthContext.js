// Create a new file AuthContext.js

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let login,logout;
  if (localStorage.getItem("token")) {
    login = () => setIsLoggedIn(true);
  }else{
    logout = () => setIsLoggedIn(false);
  }

  
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
