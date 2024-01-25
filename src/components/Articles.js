import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { Link, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import ArticleDetails from './ArticleDetails';
import ArticleList from './ArticleList';
import { useAuth } from './AuthContext';


const ProtectedRoute = ({ children }) => {
  const {user} = useAuth();
  return user!==null ? children : <Navigate to="/login" />;
};

const Articles = () => {
  const {user} = useAuth()

  return (
    <>
      <Navigation />
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
