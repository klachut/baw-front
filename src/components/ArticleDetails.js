import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import AllComents from "./AllComents"
import axios from 'axios'
const ArticleDetails = () => {
  // Pobranie danych dla konkretnego artykułu - można użyć np. API
  const { articleId = '', articleName = '' } = useParams();
  const [toogleAddComments, setAddComments] = useState(false)
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


      <div className='mb-10'>
        <p className='text-xl font-bold'>Temat: {articleName}</p>

      </div>




      {/* <p>{article.content}</p> */}

    </div>

      <button className=' mt-4 mb-5 mx-auto bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setAddComments(!toogleAddComments)}>{toogleAddComments ? "ukryj dodawanie" : "pokaz dodawanie"}</button>
      {toogleAddComments &&
        <div className='mb-10 rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2'>
          <label className="block text-gray-700 font-bold mb-2">
            Pytanie do wątku:
          </label>
          <textarea
            id="articleContent"
            name="articleContent"
            value={articleComment}
            onChange={handleCommentChange}
            className="w-full p-2 border rounded-md"
            placeholder="Wprowadź treść komentarza"
            rows="5"
            required
          ></textarea>

          <button className='flex flex-end mt-4 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Dodaj komentarz</button>

        </div>}

      {thread === null ? <div>Loading</div> :

        <div className='mb-5'>
          {thread.map(comment => (
            <div key={comment.id} className='rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2'>
              <p className='mb-5'>{comment.content}</p>
              <p className='mb-5'>Komentarz użytkownika: {comment.author}</p>


            </div>
          ))}
        </div>
      }


    </>
  );
};

export default ArticleDetails