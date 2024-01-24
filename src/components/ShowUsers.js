import React, {useEffect, useState} from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import axios from 'axios';
import { useRole } from './RoleContext';
import { useAuth } from './AuthContext';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const ShowUsers = () => {

    const options = ["Admin", "User", "Content Moderator", "Community moderator"];
    const [selectedOptions, setSelectedOptions] = useState({})
    const [users, setAllUsers] = useState()
    const {userRole, userName} = useRole()
    const {login} = useAuth();

    const handleCheckboxChange = (username, option) => {
      setSelectedOptions((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [username]: option,
      }));
    };
  

    const handleAcceptClick = async (x) => {
      const selectedOption = selectedOptions[x];
      if (selectedOption !== null) {
        try {
          const response = await fetch(
            "http://localhost:3001/api/users/role",{
              method: "POST",
              body: JSON.stringify({
                rolename: selectedOption,
                username: x,
              }),
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
          if(response.status == 200)
          { 
            getAllUsers()
                toast.success('Zmieniono uprawnienia!', {
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
                  toast.error('Nie zmieniono uprawnień!', {
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
              } catch (error) {
                // Dodanie powiadomienia toastify po błędzie logowania
      
              }
            };}


    const  getAllUsers = async () =>{
        try {
          const res = await fetch('http://localhost:3001/api/users', {
              method: "GET",
              headers: {"Content-Type": "application/json"},
              credentials: "include"
          });
    
        if(res.status == 200)
        { 
          const result = await res.json();
          console.log(result)
          setAllUsers(result)
              toast.success('Pobrano użytkowników!', {
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
                toast.error('Nie udało się pobrać użytkowników!', {
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
            } catch (error) {
              // Dodanie powiadomienia toastify po błędzie logowania
    
            }
          }

      const banUser = async (x) => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/users/ban",
            {
              method: "POST",
              body: JSON.stringify({
                username: x,
                state: true
              }),
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
          if(response.status == 200)
          { 
getAllUsers()
                toast.success('Zbanowano użytkownika!', {
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
                  toast.error('Nie udało się zbanować użytkownika!', {
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
              } catch (error) {
                // Dodanie powiadomienia toastify po błędzie logowania
      
              }
            }
  
      useEffect(() => {
        // handleCheckboxChange(userRole)
        getAllUsers()
        login()
      }, [])
    return (
    <>
    <Navigation />
    <ToastContainer />
    <div className='mx-auto p-10'>
      <h2>Lista użytkowników</h2>
      {users === null || users ==undefined ? <div>Loading</div> :  users.map((x, index) => (
        <div  key = {index} className='rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2'> 
        Username: {x.username}
        <p> 
          Nadaj dodatkowe upraweniania:
        </p>
        <div className="grid grid-cols-4 gap-4">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox rounded-md text-blue-500 focus:ring-blue-400"

              onChange={() => { handleCheckboxChange(x.username, option) }}
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}

<p> 
          Obecna rola: {x.rolename}
        </p>
        <p> 
          Czy zbanowany: {x.banned? "Tak" : "Nie"}
        </p>
      </div>
      <div className='flex gap-10'> 

      <button
       className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
        onClick={()=> handleAcceptClick(x.username)}
    
      >
        Zaakceptuj
      </button>

      <button
  className={`mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
  onClick={() => banUser(x.username)}

>
  Zbanuj użytkownika
</button>
      </div>
      </div>
      ))}
      

      {/* <ul>
        {articles.map((article) => (
          <li key={article.id} className='rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2'>
            <div className='flex flex-row justify-between'>
            <div>
              <h1 className='mb-4'>
              {article.temat}
              </h1>
              <p className='overflow-hidden line-clamp-1 h-16'>{article.content}</p>
              </div>
              <button className='bg-red-500 hover:bg-red-600 text-white font-bold max-h-10 px-4 rounded border border-red-500 shadow-md'>Delete this article</button>
              </div>
          </li>
        ))}
      </ul> */}
    </div>
    </>
  );
}

export default ShowUsers