import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';
import DeleteArticle from './components/DeleteArticle';
import { AuthProvider, useAuth } from './components/AuthContext';
import { RoleProvider } from './components/RoleContext';


const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};
const App = () => {


  return (
    <AuthProvider >
      <RoleProvider> 
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/watki/*" element={<ProtectedRoute><Articles /></ProtectedRoute>} />
          <Route path="/dodaj-watek" element={<ProtectedRoute><AddArticle /></ProtectedRoute>} />
          <Route path="/usun-watek" element={<ProtectedRoute><DeleteArticle /></ProtectedRoute>} />
          <Route path="/pokaz-uzytkownikow" element={<ProtectedRoute><DeleteArticle /></ProtectedRoute>} />
      </Routes>
    </Router>
    </RoleProvider>
    </AuthProvider>
  );
};

export default  App;