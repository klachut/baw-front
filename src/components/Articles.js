import React, {useEffect, useState} from 'react';
import Navigation from './Navigation';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ArticleDetails from './ArticleDetails';
import ArticleList from './ArticleList';
import { useRole } from './RoleContext';
import axios from 'axios'

const Articles = () => {

  const {setUserRoleFcn, setUserNameFcn} = useRole()

  const getWhoAmI = async () => {
    try {

    //  const responseWhoAmI = await axios.get('http://localhost:3001/api/auth/whoami');
    
    const res = await fetch('https://localhost:3001/api/auth/whoami', {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials: "include"
      });
    } catch (error) {

    }
    
};

// useEffect(async () => {
//   await getWhoAmI()
// }, [])
    const {userRole} = useRole()
  return (
    <><Navigation />
    <button onClick={getWhoAmI}>sprawdz kim ejsetem</button>
    <div className='mx-auto p-10'>
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route
        path="/:articleId/:articleName"
        element={<ArticleDetails />}
      />
    </Routes>
    </div>
    </>
  );
}

export default Articles