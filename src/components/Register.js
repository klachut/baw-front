import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useStyles } from './StylesContext';








const Register = () => {
  const [username, setUsername] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const navigate = useNavigate();

  const {user, unAuthedPost} = useAuth();
  const styles = useStyles();

  const handleRegister = async () => {
    // Walidacja pól
    try{
      if (!username || !passwordOne || !passwordTwo)
        throw 'Uzupełnij wszystkie pola!';

      // Walidacja długości hasła
      if (passwordOne.length < 8)
        throw 'Hasło musi mieć conajmniej 8 znaków.';


      // Walidacja obecności przynajmniej jednej cyfry
      if (!/\d/.test(passwordOne))
        throw 'Hasło musi zawierać znak cyfrę';


      // Walidacja obecności przynajmniej jednego znaku specjalnego
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordOne))
        throw 'Hasło musi zawierać znak specjalny';

      // Sprawdzenie, czy hasła się zgadzają
      if (passwordOne !== passwordTwo)
        throw 'Hasła są różne';

    }
    catch(error){
      toast.error(error, styles.toast);
      return;
    }


    try {
      const response = await unAuthedPost('/api/auth/register',{
        login: username,
        password: passwordOne
        });

      if(response === null)
        throw new Error('error')

      toast.success('Rejestracja udana!', styles.toast);
      setTimeout(() => {
        navigate('/login')
      }, 2000);

      } catch (error) {
        toast.error('Rejestracja nie powiodła się!', styles.toast);
      }
    };

      useEffect(()=>{
        if(user !== null)
          navigate('/watki')
      }, [user])


    return (
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

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

            <div className="space-y-6">
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
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setUsername(e.target.value)}
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
                  className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPasswordOne(e.target.value)}
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
                  className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPasswordTwo(e.target.value)}
               />
              </div>
            </div>
            <div>
              <button
                onClick={handleRegister}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Zarejestruj się
              </button>
            </div>

          <p className="mt-10 text-center text-sm text-gray-500">

            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Masz już konto?
            </Link>
          </p>
        </div>
      </div>
    );
}

export default Register
