import React, {useState} from 'react'
import Navigation from './Navigation'

const AddArticle = () => {

   <Navigation />

     // Stan dla przechowywania wartości tematu i treści artykułu
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');

  // Obsługa zmiany wartości w polu tematu
  const handleTitleChange = (e) => {
    setArticleTitle(e.target.value);
  };

  // Obsługa zmiany wartości w polu treści
  const handleContentChange = (e) => {
    setArticleContent(e.target.value);
  };

  // Obsługa wysłania formularza
  const handleSubmit = (e) => {
    e.preventDefault();
    // Tutaj możesz dodać kod obsługi wysłania formularza, np. zapisanie artykułu do bazy danych
    console.log('Temat artykułu:', articleTitle);
    console.log('Treść artykułu:', articleContent);
  };

  return (
    < >
    <Navigation />
    <div className='mx-auto p-10'>
      <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-7xl rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2">
        <div className="mb-4">
          <label htmlFor="articleTitle" className="block text-gray-700 font-bold mb-2">
            Nowy wątek:
          </label>
          <input
            type="text"
            id="articleTitle"
            name="articleTitle"
            value={articleTitle}
            onChange={handleTitleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Wprowadź temat artykułu"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="articleContent" className="block text-gray-700 font-bold mb-2">
            Pytanie do wątku:
          </label>
          <textarea
            id="articleContent"
            name="articleContent"
            value={articleContent}
            onChange={handleContentChange}
            className="w-full p-2 border rounded-md"
            placeholder="Wprowadź treść artykułu"
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" className="max-w-40 self-center bg-blue-500 text-white px-4 py-2 rounded">
          Dodaj artykuł
        </button>
      </form>
    </div></>
  )
  
}

export default AddArticle