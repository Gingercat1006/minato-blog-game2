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

  // 隠しルートが解放されていない場合、隠し記事は見せないフィルタリング
  const visibleArticles = allArticles.filter(article => {
    if (article.isFinal && !article.isTrueEnd) return false; // 通常の最終記事は一覧に出さない
    if (article.isHidden && !isTruthRevealed) return false; // 真実ルート解放前は隠す
    return true;
  });

  return (
    <div>
      <h2 className="article-title">全ての記事</h2>
      
       <ul className="theme-article-list">
        {visibleArticles.map(article => {
           // ロック判定
           const isLocked = article.isProtected && !unlocked[article.id];

           return (
            <li key={article.id}>
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
                // ★★★ インポートした関数を使う ★★★
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