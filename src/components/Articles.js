import React, {useState} from 'react';
import Navigation from './Navigation';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ArticleDetails from './ArticleDetails';
import ArticleList from './ArticleList';
import { useRole } from './RoleContext';


const Articles = () => {
    const {userRole} = useRole()
  return (
    <><Navigation />
    <div className='mx-auto p-10'>
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route
        path="/:articleId"
        element={<ArticleDetails />}
      />
    </Routes>
    </div>
    </>
  );
}

export default Articles