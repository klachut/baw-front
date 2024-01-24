import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ArticleList = () => {


  const [threads, setThreads] = useState(null);
  const [error, setError] = useState(null);
  const {login} = useAuth();
  
  const getAllThreads = async () => {
    try {

      const response = await axios.get('http://localhost:3001/api/content/threads');
      setThreads(response.data);
    } catch (error) {

      setError(error.message);
    }
  };
  const formatTimestamp = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = new Date(timestamp).toLocaleDateString('pl-PL', options);
    return formattedDate;
  };

  useEffect(() => {
    login()
    getAllThreads();
  }, []);



  return (
    <div className='mx-auto max-w-7xl px-10'>
      <h2>Lista wątków</h2>
      <ul>
        {threads === null ? <div>Loading</div> : threads.map((thread) => (
          <li key={thread.id} className='rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2'>
            <Link to={`/watki/${thread.id}/${thread.name}`}>
              <p className='mb-4'>
                Temat: {thread.name}
              </p>
              <div className='flex  justify-between'>
                <p> Autor: {thread.author}</p>
                <p> Utworzono: {formatTimestamp(thread.created_on)}</p>
              </div>


            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList