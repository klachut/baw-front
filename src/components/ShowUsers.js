import React, {useState} from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import axios from 'axios';

const ShowUsers = () => {
    // Przykładowe dane - możesz je zamienić na rzeczywiste dane
    const articles = [ {
      temat: "test1",
      content: "to jest content",
      id: 1
    },
    {
      temat: "test2",
      content: "to jest inny content",
      id: 2
    },
    {
      temat: "test3",
      content: "kolejny content",
      id: 3
    },
    {
      temat: "test4",
      content: "inny inny content",
      id: 4
    },
    {
      temat: "test5",
      content: "content content",
      id: 5
    }]

    const options = ["Opcja 1", "Opcja 2", "Opcja 3", "Opcja 4"];
    const [selectedOption, setSelectedOption] = useState(null);
    const handleCheckboxChange = (option) => {
      if (selectedOption === option) {
        // Jeśli ta opcja jest już zaznaczona, odznacz ją
        setSelectedOption(null);
      } else {
        // W przeciwnym razie zaznacz nową opcję
        setSelectedOption(option);
      }
    };

    const handleAcceptClick = () => {
      // Wysyłanie danych do API za pomocą Axios
      if (selectedOption !== null) {
        axios.post('URL_DO_API', { selectedOption })
          .then(response => {
            console.log('Dane wysłane pomyślnie!', response.data);
            // Tutaj możesz dodać dodatkową obsługę po pomyślnym wysłaniu danych
          })
          .catch(error => {
            console.error('Błąd podczas wysyłania danych do API:', error);
            // Tutaj możesz obsłużyć błędy wysyłania danych do API
          });
      } else {
        console.warn('Wybierz opcję przed kliknięciem Zaakceptuj.');
      }
    };
    return (
    <>
    <Navigation />
    <div className='mx-auto p-10'>
      <h2>Lista użytkowników</h2>
      <div className='rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2'> 
        Username: kotek
        <p> 
          Nadaj dodatkowe upraweniania:
        </p>
        <div className="grid grid-cols-4 gap-4">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox rounded-md text-blue-500 focus:ring-blue-400"
              checked={selectedOption === option}
              onChange={() => handleCheckboxChange(option)}
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      <div className='flex gap-10'> 
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAcceptClick}
      >
        Zaakceptuj
      </button>

      <button
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAcceptClick}
      >
        Zbanuj użytkownika
      </button>

      </div>
      </div>

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