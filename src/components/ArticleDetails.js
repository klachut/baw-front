import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import AllComents from "./AllComents";
import axios from "axios";
import { useRole } from "./RoleContext";
const ArticleDetails = () => {
  // Pobranie danych dla konkretnego artykułu - można użyć np. API
  const { articleId = "", articleName = "" } = useParams();
  const {userName, userRole} = useRole()
  const [toogleAddComments, setAddComments] = useState(false);
  const [articleComment, setArticleComment] = useState("");
  const handleCommentChange = (e) => {
    setArticleComment(e.target.value);
  };

  const [thread, setThread] = useState(null);
  const [error, setError] = useState(null);
  const getAllThreads = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/content/messages/${articleId}`
      );
      setThread(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const hadleAddComment = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/content/messages/new",
        {
          method: "POST",
          body: JSON.stringify({
            content: articleComment,
            threadid: articleId,
          }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      getAllThreads();
      // Sprawdzamy, czy odpowiedź jest w porządku (status 2xx)
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  };

  const deteleComment = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/content/messages/delete",
        {
          method: "POST",
          body: JSON.stringify({
            messageid: id,
          }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      getAllThreads();
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  }
  useEffect(() => {
    getAllThreads();
  }, []);



  return (
    <>
      <div>
        <div className="mb-10">
          <p className="text-xl font-bold">Temat: {articleName}</p>
        </div>

        {/* <p>{article.content}</p> */}
      </div>

      <button
        className=" mt-4 mb-5 mx-auto bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setAddComments(!toogleAddComments)}
      >
        {toogleAddComments ? "Ukryj dodawanie komentarza" : "Pokaż dodawanie komentarza"}
      </button>
      {toogleAddComments && (
        <div className="mb-10 rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2">
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

          <button
            className="flex flex-end mt-4 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={hadleAddComment}
          >
            Dodaj komentarz
          </button>
        </div>
      )}

      {thread === null ? (
        <div>Loading</div>
      ) : (
        <div className="mb-5">
          {thread.map((comment) => (
           <> <div
              key={comment.id}
              className="rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2 relative"
            >
              <p className="mb-5">{comment.content}</p>
              <p className="mb-5">Komentarz użytkownika: {comment.author}</p>
              {  (userName == comment.author  || userRole == 'Content Moderator'|| userRole == 'Admin' || userRole == 'Community Moderator'  ) && <button className=" text-red-600 absolute bottom-0 right-0 p-2" onClick={() => deteleComment(comment.id)}>
              Usuń komentarz
            </button>}
            </div>

            
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default ArticleDetails;
