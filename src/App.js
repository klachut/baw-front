import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';
import DeleteArticle from './components/DeleteArticle';
import { AuthProvider, useAuth } from './components/AuthContext';
import { RoleProvider } from './components/RoleContext';
import ShowUsers from './components/ShowUsers';


const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to="/login" />;
};
const App = () => {


  return (
    <RoleProvider> 
    <AuthProvider >

    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/watki/*" element={<Articles /> } />
          <Route path="/dodaj-watek" element={<ProtectedRoute><AddArticle /></ProtectedRoute>} />
          <Route path="/usun-watek" element={<ProtectedRoute><DeleteArticle /></ProtectedRoute>} />
          <Route path="/pokaz-uzytkownikow" element={<ProtectedRoute><ShowUsers /></ProtectedRoute>} />
      </Routes>
    </Router>

    </AuthProvider>
    </RoleProvider>
  );
};

export default  App;