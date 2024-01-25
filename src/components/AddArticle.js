import React, {useState} from 'react'
import Navigation from './Navigation'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useStyles } from './StylesContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddArticle = () => {

  const navigate = useNavigate();
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const {authedPost} = useAuth();
  const styles = useStyles();

  const addNewThread =  async () => {
    try {
      const response = await authedPost('/api/content/threads/new', {
        title: articleTitle,
        content: articleContent,
      });

      if(response === null)
        throw new Error("error")

      toast.success('Udało się dodać wątek!', styles.toast );
      setTimeout(() => {
        navigate('/watki')
      }, 2000)

    } catch (error) {
      toast.error('Nie udało się dodać wątku', styles.toast );
    }
  }




  return (
    <>
      <Navigation />
    <div className="mx-4 p-10 flex flex-col mx-auto max-w-7xl rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2">

        <div className="mb-4">
          <label htmlFor="articleTitle" className="block text-gray-700 font-bold mb-2">
            Nowy wątek:
          </label>
          <input
            type="text"
            id="articleTitle"
            name="articleTitle"
            onChange={(e) => setArticleTitle(e.target.value)}
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
            onChange={(e) => setArticleContent(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Wprowadź treść artykułu"
            rows="5"
            required
          ></textarea>
        </div>

        <button  className="max-w-40 self-center bg-blue-500 text-white px-4 py-2 rounded" onClick={addNewThread}>
          Dodaj artykuł
        </button>

    </div></>
  )

}

export default AddArticle
