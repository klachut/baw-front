import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { Link, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import ArticleDetails from './ArticleDetails';
import ArticleList from './ArticleList';
import { useRole } from './RoleContext';
import { useAuth } from './AuthContext';
import UnloggedNavigation from './UnloggedNavigation';


const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to="/login" />;
};
const Articles = () => {
  const { loggedIn } = useAuth()



  return (
    <>{loggedIn ? <Navigation /> : <UnloggedNavigation />}
      <div className='mx-auto p-10'>
        <Routes>
          <Route path="/" element={<ArticleList />} />

          <Route
            path="/:articleId/:articleName"
            element={<ProtectedRoute> <ArticleDetails /></ProtectedRoute>}
          />
        </Routes>
      </div>
    </>
  );
}

export default Articles