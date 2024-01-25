import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useStyles } from './StylesContext';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ArticleDetails = () => {
  const { articleId = "", articleName = "" } = useParams();
  const {user, authedGet, authedPost} = useAuth()
  const styles = useStyles();

  const [toogleAddComments, setAddComments] = useState(false);
  const [articleComment, setArticleComment] = useState("");
  const [thread, setThread] = useState(null);
  const [error, setError] = useState(null);


  const getAllThreads = async () => {
    try {
      const response = await authedGet(`/api/content/messages/${articleId}`);

      if(response === null)
        throw new Error('error');

      setThread(await response.json());
      toast.success('Pobranie wątków powiodło się!', styles.toast);

    } catch (error) {
      toast.error('Nie pobrano wątków', styles.toast);
    }
  };

  const hadleAddComment = async () => {
    try {
      const response = await authedPost("/api/content/messages/new",{
            content: articleComment,
            threadid: articleId,
        });
      if(response === null)
        throw new Error('error');
      getAllThreads();
      toast.success('Komentarz dodano!', styles.toast);

    } catch (error) {
      toast.error('Nie udało się dodać komentarza', styles.toast);
    }


  };

  const deteleComment = async (id) => {
    try {
      const response = await authedPost("/api/content/messages/delete",{
            messageid: id
        });
      if(response === null)
        throw new Error('error');

        getAllThreads();
        toast.success('Komentarz usunięty!', styles.toast);


    } catch (error) {
      toast.error('Nie udało się usunąć komentarza!', styles.toast);
    }


  };



  const banUser = async (x) => {
    try {
      const response = await authedPost("/api/users/ban",{
            username: x,
            state: true
          });

      if(response === null)
        throw new Error('error')
        getAllThreads();

        toast.success('Użytkownik został zbanowany',styles.toast);

    } catch (error) {
      toast.error('Nie udało się zbanować użytkownika', styles.toast);
    }


  };


  useEffect(() => {
    getAllThreads();
  }, []);


  return (
    <div className="mx-auto max-w-7xl px-10">
      <div >
        <div className="mb-10">
          <p className="text-xl font-bold">Temat: {articleName}</p>
        </div>
      </div>

<button
        className=" mt-4 mb-5 mx-auto bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setAddComments(!toogleAddComments)}
      >
        {(toogleAddComments ) ? "Ukryj dodawanie komentarza" : "Pokaż dodawanie komentarza"}
      </button>
      {toogleAddComments  && (
        <div className="mb-10 rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2">
          <label className="block text-gray-700 font-bold mb-2">
            Pytanie do wątku:
          </label>
          <textarea
            id="articleContent"
            name="articleContent"
            onChange={(e) => setArticleComment(e.target.value)}
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
              {(user.username == comment.author || user.rolename == 'Content Moderator' || user.rolename == 'Admin' ) && <button className=" text-red-600 absolute bottom-0 right-0 p-2" onClick={() => deteleComment(comment.id)}>
                Usuń komentarz
              </button>}

              {( user.rolename == 'Admin' || user.rolename == 'Community Moderator') && <button className=" text-red-600 absolute bottom-0  right-32 p-2" onClick={() => banUser(comment.author)}>
                Zbanuj użytkownika
              </button>}
            </div>


            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;
