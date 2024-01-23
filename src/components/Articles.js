import React, {useEffect, useState} from 'react';
import Navigation from './Navigation';
import { Link, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import ArticleDetails from './ArticleDetails';
import ArticleList from './ArticleList';
import { useRole } from './RoleContext';
import axios from 'axios'
import { useAuth } from './AuthContext';
import UnloggedNavigation from './UnloggedNavigation';


const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to="/login" />;
};
const Articles = () => {

  const {setUserRoleFcn, setUserNameFcn} = useRole()
  const {loggedIn} = useAuth()

  const getWhoAmI = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/whoami', {
          method: "GET",
          headers: {"Content-Type": "application/json"},
          credentials: "include"
      });
  
      // Sprawdzamy, czy odpowiedź jest w porządku (status 2xx)
      if (res.ok) {
          const result = await res.json();
          setUserRoleFcn(result.rolename)
      } else {
          console.error("Błąd zapytania:", res.status, res.statusText);
      }
  } catch (error) {
      console.error("Wystąpił błąd:", error);
  }

};

useEffect( () => {
   getWhoAmI()
}, [])
    const {userRole} = useRole()
  return (
    <>{loggedIn ? <Navigation /> : <UnloggedNavigation /> }
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