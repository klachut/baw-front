import React, {useState} from 'react';
import { Link, Route, Routes, useNavigate, useParams  } from 'react-router-dom';
import AllComents from "./AllComents"
const ArticleDetails = () => {
    // Pobranie danych dla konkretnego artykułu - można użyć np. API
    const { articleId = '' } = useParams();
    const article = { id: articleId, title: `Artykuł ${articleId}`, content: `Treść artykułu ${articleId}` };
 
    console.log(articleId)
    
  const [articleComment, setArticleComment] = useState('');

  // Obsługa zmiany wartości w polu tematu
  // Obsługa zmiany wartości w polu treści
  //Tutaj będzie połączenie do API, które pobierze treść posta do api
  // 
  const handleCommentChange = (e) => {
    setArticleComment(e.target.value);
  };

    return (
     <><div>
        <p>To jest treść posta</p>
        <h2>{article.id} tets</h2>
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