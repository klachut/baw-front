import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Navigation from './Navigation';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { useAuth } from "./AuthContext";
import { useStyles } from './StylesContext';


const DeleteArticle = () => {
  const { user, authedPost, unAuthedGet} = useAuth();
  const styles = useStyles();

  const [threads, setThreads] = useState(undefined);
  const [error, setError] = useState(null);

  const getAllThreads = async () => {
    try {
      const response = await unAuthedGet("/api/content/threads");
      if(response === null)
        throw new Error('error');
      setThreads(await response.json());
    } catch (error) {
      setThreads(null);
      toast.error('Nie udało się pobrać wątków!', styles.toast);
    }
  };

const deleteArticle = async (x) => {
    try {
      const response = await authedPost("/api/content/threads/delete",{
            threadid: x,
          });
      if(response === null)
        throw new Error("error");


        getAllThreads();
        toast.success('Wątek usunięty!', styles.toast);

    } catch (error) {
      toast.error('Nie udało się usunąć wątku!', styles.toast)
    }

}

  useEffect(() => {
    getAllThreads();
  }, []);


  return (
    <div className="">
          <Navigation />
      <div className="mx-auto max-w-7xl p-5">
        <h2>Lista artykułów</h2>
        <ul>
          {(
           threads === undefined ?
            <div className={styles.contentCard}> Loading</div>
            :
            threads === null?
              <div className={styles.contentCard}>Could not load threads</div>
            :
            threads.map((thread) => (

            <li
             key={thread.id}
             className="relative rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2"
           >
             <Link to={`/watki/${thread.id}/${thread.name}`}>
               <p className="mb-4">Temat: {thread.name}</p>
               <div className="flex  flex-col justify-between">
                 <p> Autor: {thread.author}</p>
                 <p> Utworzono: {thread.created_on}</p>
               </div>
             </Link>
             <button className="absolute right-0 m-3 bottom-0   text-red-600 font-bold max-h-10 px-4 rounded border border-red-500 shadow-md" onClick={() => {deleteArticle(thread.id)}}>
               Usuń wątek
             </button>

           </li>
           ))) }
        </ul>
      </div>
    </div>
  );
};

export default DeleteArticle;
