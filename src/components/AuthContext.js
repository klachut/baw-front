import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRole } from './RoleContext';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const {setUserRoleFcn, setUserNameFcn} = useRole()
  const [loggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    const updateLocalStorage = async () => {
      localStorage.setItem('isLoggedIn', loggedIn);
    };
    updateLocalStorage();
  }, [loggedIn]);

  const login = async  () => {

    try {
      const res = await fetch('http://localhost:3001/api/auth/whoami', {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials: "include"
      });
      if (res.ok) {
        const result = await res.json();
        setIsLoggedIn(true);
        setUserRoleFcn(result.rolename)
        setUserNameFcn(result.username)
        localStorage.setItem('isLoggedIn', true);
    } else {
      setIsLoggedIn(false);
      setUserRoleFcn("")
      setUserNameFcn("")
      localStorage.setItem('isLoggedIn', false);
    }

  } catch (error) {
      console.error("Wystąpił błąd:", error);
  }
  };

  const logout =async () => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/logout', {
          method: "POST", 
          headers: {"Content-Type": "application/json"},
          credentials: "include"
      });
  
      if (res.status == 200) {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', false);
      }
  } catch (error) {
      console.error("Wystąpił błąd:", error);
  }

  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

export const useAuth = () => {
  return useContext(AuthContext);
};
