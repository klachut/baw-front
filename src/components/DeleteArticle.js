import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { useRole } from "./RoleContext";
import { useAuth } from "./AuthContext";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const DeleteArticle = () => {
  const { userName, userRole } = useRole();
  const [threads, setThreads] = useState(null);
  const [error, setError] = useState(null);
  const {login} = useAuth();
  
  const getAllThreads = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/content/threads"
      );
      setThreads(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

const deleteArticle = async (x) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/content/threads/delete",
        {
          method: "POST",
          body: JSON.stringify({
            threadid: x,
          }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if(response.status == 200){
        getAllThreads();
        toast.success('Wątek usunięty!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        });
      }
      else {
        toast.error('Nie udało się usunąć wątku!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });}
    } catch (error) {
      setError(error.message);
    }
   
}

  useEffect(() => {
    getAllThreads();
    login()
  }, []);

  
  return (
    <div className="">
      <Navigation />
      <ToastContainer />
      <div className="mx-auto max-w-7xl p-5">
        <h2>Lista Twoich artykułów</h2>
        <ul>
          { userRole == 'User' ? 
           (threads == null ? <div>Loading</div> : threads.filter((thread) => userName === thread.author).map((thread ) => (
          
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
            {(userName == thread.author ||
              userRole == "Content Moderator" ||
              userRole == "Admin"
              ) && (
              <button className="absolute right-0 m-3 bottom-0   text-red-600 font-bold max-h-10 px-4 rounded border border-red-500 shadow-md" onClick={() => {deleteArticle(thread.id)}}>
                Usuń artykuł
              </button>
            )}
          </li>
          ))) : (threads == null ? <div>Loading</div> : threads.map((thread) => (
          
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
            
             {(userName == thread.author ||
               userRole == "Content Moderator" ||
               userRole == "Admin" ||
               userRole == "Community Moderator") && (
               <button className="absolute right-0 m-3 bottom-0   text-red-600 font-bold max-h-10 px-4 rounded border border-red-500 shadow-md" onClick={() => {deleteArticle(thread.id)}}>
                 Usuń wątek
               </button>
             )}
           </li>
           ))) }
        </ul>
      </div>
    </div>
  );
};

export default DeleteArticle;
