import React, {useState} from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import ArticleDetails from './ArticleDetails';
const ArticleList = () => {
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
  
    return (
      <div>
        <h2>Lista wątków</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id} className='rounded-lg overflow-hidden border border-gray-300 shadow-lg p-4 my-2'>
              <Link to={`/watki/${article.id}`}>
                <h1 className='mb-4'>
                {article.temat}
                </h1>
                <p className='overflow-hidden line-clamp-1 h-16'>{article.content}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default ArticleList