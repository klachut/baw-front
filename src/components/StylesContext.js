import React, { createContext, useContext, useState, useEffect } from 'react';


const StylesContext = createContext();

const StylesProvider = ({ children }) => {

  const styles={
    goodButton:`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`,
    badButton:`mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`,
    roleCheckbox: "form-checkbox rounded-md text-blue-500 focus:ring-blue-400",
    contentCard: 'rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2',
    toast: {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  }


  return (
    <StylesContext.Provider value={styles}>
      {children}
    </StylesContext.Provider>
  );
};

export { StylesProvider, StylesContext };

export const useStyles = () => {
  return useContext(StylesContext);
};
