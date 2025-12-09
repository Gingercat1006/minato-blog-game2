// src/pages/HomePage.jsx 
import React from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useGameLogic.jsx'; // 記事データ取得
import { useGame } from '../hooks/useGameLogic.jsx';     // 鍵の状態取得
// ★★★ ここで便利関数をインポート ★★★
import { stripCommands, truncateText } from '../hooks/useGameLogic.jsx';

const HomePage = () => {
  const { allArticles } = useArticles();
  const { unlocked, isTruthRevealed } = useGame();

  const visibleArticles = allArticles.filter(article => {
    if (article.isFinal && !article.isTrueEnd) return false;
    if (article.isHidden && !isTruthRevealed) return false;
    return true;
  });

  return (
    <div>
      <h2 className="article-title">全ての記事</h2>
      
       <ul className="theme-article-list">
        {visibleArticles.map(article => {
           const isLocked = article.isProtected && !unlocked[article.id];
           
           // ★★★ 修正点：これが「真実の記事（隠しルート）」なら、特別なクラスをつける ★★★
           const itemClass = article.isHidden ? "new-arrival" : "";

           return (
            // ★ className に itemClass を追加
            <li key={article.id} className={itemClass}>
              <p className="article-meta">
                <time>{article.date}</time> | 
                <span className="category">{article.theme}</span>
              </p>
              <Link to={`/home/article/${article.id}`}>
                {article.title} 
                {isLocked && <span>[鍵]</span>}
              </Link>
              
              {isLocked ? (
                <p>この記事はパスワードで保護されています...</p>
              ) : (
                <p>{truncateText(stripCommands(article.content), 100)}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default HomePage;