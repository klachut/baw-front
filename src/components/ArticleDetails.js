import React, {useState, useEffect} from 'react';
import { Link, Route, Routes, useNavigate, useParams  } from 'react-router-dom';
import AllComents from "./AllComents"
import axios from 'axios'
const ArticleDetails = () => {
    // Pobranie danych dla konkretnego artykułu - można użyć np. API
    const { articleId = '' } = useParams();
   
    const [articleComment, setArticleComment] = useState('');

  const handleCommentChange = (e) => {
    setArticleComment(e.target.value);
  };

  const [thread, setThread] = useState(null);
  const [error, setError] = useState(null);
  const getAllThreads = async () => {
    try {

      const response = await axios.get(`http://localhost:3001/api/content/messages/${articleId}`);
      setThread(response.data);
      console.log(response.data)
    } catch (error) {

      setError(error.message);
    }
  };
  useEffect(() => {

    getAllThreads();
  }, []);

  



    return (
     <><div>

        {thread === null ? <div>Loading</div>  :
        
          <div>

            <p>{thread.id}</p>
          </div>
        
        
        }
       
        {/* <p>{article.content}</p> */}

      </div>

      <label className="block text-gray-700 font-bold mb-2">
            Pytanie do wątku:
          </label>
          <textarea
            id="articleContent"
            name="articleContent"
            value={articleComment}
            onChange={handleCommentChange}
            className="w-full p-2 border rounded-md"
            placeholder="Wprowadź treść artykułu"
            rows="5"
            required
          ></textarea>

      <button>Dodaj komentarz</button>
      <AllComents id={articleId} />
      </> 
    );
  };
  
  export default ArticleDetails