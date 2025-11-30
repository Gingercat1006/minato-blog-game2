// src/pages/ThemePage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/gameData';

const ThemePage = () => {
  const { themeName } = useParams();

  const filteredArticles = Object.values(articles).filter(
    article => article.theme === themeName && !article.isProtected
  );

  return (
    <div>
      <h2 className="article-title">テーマ: {themeName}</h2>

      <ul className="theme-article-list">
        {filteredArticles.map(article => (
          <li key={article.id}>
            <Link to={`/home/article/${article.id}`}>
              {article.title}
            </Link>
            <p>
              {article.content.substring(0, 50)}...
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemePage;