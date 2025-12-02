// src/pages/HomePage.jsx 
import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/gameData';


// 白文字に置き換え
const stripCommands = (content) => {
  return content.replace(/(\[HIDDEN\].*?\[\/HIDDEN\]|\[IMAGE:.+?\])/g, '');
};

// 呪文②：文章を、指定された文字数で、美しく切り詰める、要約の呪文
const truncateText = (text, length) => {
  const cleanedText = text.replace(/\n/g, ' '); // 改行をスペースに置き換える
  if (cleanedText.length <= length) {
    return cleanedText;
  }
  return cleanedText.substring(0, length) + '...';
};


const HomePage = () => {
  const allArticles = Object.values(articles).filter(article => !article.isFinal);
  const sortedArticles = allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h2 className="article-title">全ての記事</h2>
      
       <ul className="theme-article-list">
        {sortedArticles.map(article => (
          <li key={article.id}>
            <p className="article-meta">
              <time>{article.date}</time> | 
              <span className="category">{article.theme}</span>
            </p>
            <Link to={`/home/article/${article.id}`}>
              {article.title} 
              {article.isProtected && <span>[鍵]</span>}
            </Link>
            {article.isProtected ? (
              <p>この記事はパスワードで保護されています...</p>
            ) : (
              <p>{truncateText(stripCommands(article.content), 100)}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;