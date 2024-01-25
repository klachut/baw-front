import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast} from 'react-toastify';
import { useStyles } from './StylesContext';

const ArticleList = () => {


  const [threads, setThreads] = useState(undefined);
  const [error, setError] = useState(null);
  const {user, unAuthedGet} = useAuth();
  const styles = useStyles();

  const getAllThreads = async () => {
    try {
      const response = await unAuthedGet('/api/content/threads');
      if(response === null)
        throw 'error'
      setThreads(await response.json());
    } catch (error) {
      setThreads(null);
      toast.error('Nie udało się pobrać wiadomości', styles.toast);
    }
  };
  const formatTimestamp = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = new Date(timestamp).toLocaleDateString('pl-PL', options);
    return formattedDate;
  };

  useEffect(() => {
    getAllThreads();
  }, []);



  return (
    <div className='mx-auto max-w-7xl px-10'>
      <h2>Lista wątków</h2>
      <ul>
        {        threads === undefined ?
                  <div className={styles.contentCard}> Loading</div>
                :
                threads === null?
                  <div className={styles.contentCard}>Could not load threads</div>
                :
                 threads.map((thread) => (
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
