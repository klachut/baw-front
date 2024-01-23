// AuthContext.js
import React, { createContext, useContext, useEffect, useReducer } from 'react';


const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Sprawdź, czy token istnieje w localStorage i czy jest ważny
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // const decodedToken = jwt.verify(token, 'secret_key'); // Zastąp 'secret_key' swoim sekretnym kluczem
        dispatch({ type: 'LOGIN', payload: { user: token } });
      } catch (error) {
        console.error('Błąd weryfikacji tokenu:', error);
        // W przypadku błędu weryfikacji tokena, wyloguj użytkownika
        dispatch({ type: 'LOGOUT' });
      }
    }
  }, []);

  const login = (token) => {
    // Po pomyślnym logowaniu, zapisz token w localStorage i zdekoduj jego zawartość
    // const decodedToken = jwt.verify(token, 'secret_key'); // Zastąp 'secret_key' swoim sekretnym kluczem
    localStorage.setItem('token', token);
    dispatch({ type: 'LOGIN', payload: { user: token } });
  };

  const logout = () => {
    // Po wylogowaniu, usuń token z localStorage
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

export const useAuth = () => {
    return useContext(AuthContext);
  };