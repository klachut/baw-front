import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStyles } from './StylesContext';




const Login = (props) => {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {user, unAuthedPost, triggerUpdate} = useAuth();
    const styles = useStyles();


    const handleLogin = async () => {
        try {
          const response = await unAuthedPost('/api/auth/login', {
                login: userName,
                password: password,
            });

        if(response === null)
          throw new Error("error")

        toast.success('Użytkownik zalogowany!', styles.toast);
        await triggerUpdate();
        setTimeout(() => {
          navigate('/watki')
        }, 2000);

        } catch (error) {
          toast.error('Nie udało się zalogować!', styles.toast);

        }
      };


      useEffect(()=>{
        if(user!==null)
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
            Zaloguj się do swojego konta!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6" >
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Nazwa użytkownika
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  required
                  className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userName} onChange={(e) => setUsername(e.target.value)}
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
                  className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={password} onChange={(e) => setPassword(e.target.value)}
               />
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Nie masz konta? {"  "}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
             Zarejestruj się!
            </Link>
          </p>
        </div>
      </div>
    );
}

export default Login
