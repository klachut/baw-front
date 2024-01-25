import React, {useEffect, useState} from 'react';
import Navigation from './Navigation';
import { useAuth } from './AuthContext';
import { useStyles } from './StylesContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'




const ShowUsers = () => {

    const options = ["Admin", "User", "Content Moderator", "Community Moderator"];
    const [selectedOptions, setSelectedOptions] = useState({})
    const [users, setAllUsers] = useState(undefined)
    const {user, authedPost, authedGet} = useAuth();
    const styles = useStyles();

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
          const response = await authedPost("/api/users/role",{
                rolename: selectedOption,
                username: x,
              });

          if(response === null)
            throw new Error('error');

            getAllUsers()
            toast.success('Zmieniono uprawnienia!', styles.toast);
          }
          catch (error) {
            toast.error('Nie zmieniono uprawnień!', styles.toast);
          }
        }
      }


    const  getAllUsers = async () =>{
        try {
          const res = await authedGet('/api/users');

        if(res === null)
          throw new Error('error');

        const result = await res.json();
        setAllUsers(result)
        toast.success('Pobrano użytkowników!', styles.toast);

        }
        catch (error) {
          setAllUsers(null)
          toast.error('Nie udało się pobrać użytkowników!', styles.toast);
        }
    }

      const banUnbanUser = async (x, banned) => {
        try {
          const response = await authedPost("/api/users/ban",{
                username: x,
                state: banned
              });
          if(response === null)
            throw new Error('error');

          getAllUsers()
          toast.success((banned?"Zbanowano":"Odbanowano")+' użytkownika!', styles.toast);

          } catch (error) {
            toast.error('Nie udało się '+(banned?"Zbanować":"Odbanować")+' użytkownika!', styles.toast);
          }
        }



      useEffect(() => {
        getAllUsers()

      }, [])








    return (
    <>
          <Navigation />
    <div className='mx-auto max-w-7xl p-5'>
      <h2>Lista użytkowników</h2>
      {
        users === undefined ?
          <div className={styles.contentCard}> Loading</div>
        :
        users === null?
          <div className={styles.contentCard}>Could not load users</div>
        :

        users.sort((a,b) => {return a.username.toLowerCase() > b.username.toLowerCase()}).map((x, index) => (
        <div  key = {index} className={styles.contentCard}>
        Username: {x.username}
        <p>
          Nadaj dodatkowe upraweniania:
        </p>

        <div className="grid grid-cols-4 gap-4">
        {options.map((option, indexRole) => (
          <label key={indexRole} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              className={styles.roleCheckbox}
              name={"role"+index}
              onChange={() => { handleCheckboxChange(x.username, option) }}
              defaultChecked={x.rolename===option}
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
        <button className={styles.goodButton} onClick={()=> handleAcceptClick(x.username)}>
          Zaakceptuj
        </button>

        <button className={styles.badButton} onClick={() => banUnbanUser(x.username, true)}>
          Zbanuj użytkownika
        </button>

        <button className={styles.goodButton} onClick={() => banUnbanUser(x.username, false)}>
          Odbanuj użytkownika
        </button>
      </div>
      </div>
      ))}

    </div>
    </>
  );
}

export default ShowUsers
