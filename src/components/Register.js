import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from './AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [validationError, setValidationError] = useState(null);
  const {login} = useAuth()
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault()
    // Walidacja pól
    if (!username || !passwordOne || !passwordTwo) {
      toast.error('Uzupełnij wszystkie pola!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Walidacja długości hasła
    if (passwordOne.length < 8) {
      toast.error('Hasło musi mieć conajmniej 8 znaków.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Walidacja obecności przynajmniej jednej cyfry
    if (!/\d/.test(passwordOne)) {
      toast.error('Hasło musi zawierać znak cyfrę', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Walidacja obecności przynajmniej jednego znaku specjalnego
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordOne)) {
      toast.error('Hasło musi zawierać znak specjalny', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Sprawdzenie, czy hasła się zgadzają
    if (passwordOne !== passwordTwo) {
      toast.error('Hasła są różne', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          login: username,
          password: passwordOne,
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if(response.status == 200)
    {      await login();
          
          toast.success('Rejestracja udana!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

          });
          setTimeout(() => {
            navigate('/login')
          }, 2000);
        }
          else {
            toast.error('Rejestracja nie powiodła się!', {
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
      };


  
    return (
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <ToastContainer />

          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Zarejestruj się!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" >
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Nazwa użytkownika
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={username} onChange={(e) => setUsername(e.target.value)} 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Hasło
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={passwordOne} onChange={(e) => setPasswordOne(e.target.value)}
               />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Powtórz hasło
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={passwordTwo} onChange={(e) => setPasswordTwo(e.target.value)}
               />
              </div>
            </div>

        {/* Wyświetlanie komunikatu o błędzie walidacji */}
        {/* {validationError && (
          <p className="mt-2 text-center text-sm text-red-600">{validationError}</p>
        )} */}
            <div>
              <button
                onClick={handleRegister}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Zarejestruj się
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">

            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Masz już konto?
            </Link>
          </p>
        </div>
      </div>
    // </>
    );
}

export default Register