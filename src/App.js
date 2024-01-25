import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';
import DeleteArticle from './components/DeleteArticle';
import { AuthProvider, useAuth } from './components/AuthContext';
import { StylesProvider} from './components/StylesContext';
import ShowUsers from './components/ShowUsers';
import { ToastContainer } from 'react-toastify';
import Navigation from "./components/Navigation";


const ProtectedRoute = ({ children }) => {
  const {user} = useAuth();
  return user!==null ? <>{children} </>: <></>;
};




const App = () => {


  return (

  <Router>
    <AuthProvider>
      <ToastContainer />
      <StylesProvider>
            <Routes>

              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/watki/*" element={<ProtectedRoute><Articles /></ProtectedRoute>} />
              <Route path="/dodaj-watek" element={<ProtectedRoute><AddArticle /></ProtectedRoute>} />
              <Route path="/usun-watek" element={<ProtectedRoute><DeleteArticle /></ProtectedRoute>} />
              <Route path="/pokaz-uzytkownikow" element={<ProtectedRoute><ShowUsers /></ProtectedRoute>} />
            </Routes>

      </StylesProvider>
    </AuthProvider>
  </Router>
  );
};

export default App;
