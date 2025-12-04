// src/pages/HomePage.jsx 
import React from 'react';
import '../css/ArticlePage.css'; // 必要であれば
import { Link } from 'react-router-dom';
import { articles } from '../data/gameData';

// 白文字に置き換え
const stripCommands = (content) => {
  return content.replace(/(\[HIDDEN\].*?\[\/HIDDEN\]|\[IMAGE:.+?\]|\[LINK:.+?\])/g, '');
};

// 文章を要約
const truncateText = (text, length) => {
  const cleanedText = text.replace(/\n/g, ' ');
  if (cleanedText.length <= length) {
    return cleanedText;
  }
  return cleanedText.substring(0, length) + '...';
};

//isTruthRevealed を受け取ります
const HomePage = ({ isTruthRevealed }) => {
  
  const allArticles = Object.values(articles).filter(article => {
    // 1. 通常の「最後の記事(isFinal)」は一覧に出さない（リンクから飛ぶため）
    // ただし、TrueEnd用の記事は isFinal でも出す場合があるので区別します
    if (article.isFinal && !article.isTrueEnd) return false;

    // 2. 「隠し記事(isHidden)」は、フラグ(isTruthRevealed)が立っていないと隠す
    if (article.isHidden && !isTruthRevealed) return false;

    return true;
  });

  const sortedArticles = allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h2 className="article-title">全ての記事</h2>
      
       <ul className="theme-article-list">
        {sortedArticles.map(article => (
          // 緊急更新の記事だけ背景を赤くする演出
          <li key={article.id} style={{ backgroundColor: article.theme === '緊急更新' ? '#fff0f0' : 'transparent' }}>
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