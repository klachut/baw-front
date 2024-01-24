import React, {useState} from 'react'
import Navigation from './Navigation'
import { useNavigate } from 'react-router-dom';

const AddArticle = () => {

  const navigate = useNavigate();
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');

  const handleTitleChange = (e) => {
    setArticleTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setArticleContent(e.target.value);
  };


  const addNewThread =  async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(
        "http://localhost:3001/api/content/threads/new",{
          method: "POST",
          body: JSON.stringify({
            title: articleTitle,
            content: articleContent,
          }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
        navigate('/watki')

    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
    }

  return (
    < >
    <Navigation />
    <div className='mx-auto p-10'>
      <form className="flex flex-col mx-auto max-w-7xl rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2">
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

        <button  className="max-w-40 self-center bg-blue-500 text-white px-4 py-2 rounded" onClick={addNewThread}>
          Dodaj artykuł
        </button>
      </form>
    </div></>
  )
  
}

export default AddArticle