import React, { createContext, useContext, useState } from 'react';

// Utwórz kontekst
const RoleContext = createContext();

// Funkcja dostarczająca kontekst
export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const setUserRoleFcn = (role) => {
    setUserRole(role);
  };

  const setUserNameFcn = (name) => {
    setUserName(name);
  };


  return (
    <RoleContext.Provider value={{ userRole, userName, setUserRoleFcn, setUserNameFcn}}>
      {children}
    </RoleContext.Provider>
  );
};

// Własny hook do korzystania z kontekstu
export const useRole = () => {
  const context = useContext(RoleContext);
  return context;
};
