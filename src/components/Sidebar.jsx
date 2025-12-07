// src/components/Sidebar.jsx
import '../css/Sidebar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/gameData';

// isTruthRevealed を受け取るように変更
const Sidebar = ({ isTruthRevealed }) => {
  
  // フィルタリングロジックだけ強化
  const allArticles = Object.values(articles).filter(article => {
    // 1. 通常の「最後の記事(isFinal)」は隠す（ただしTrueEnd用は別扱い）
    if (article.isFinal && !article.isTrueEnd) return false;

    // 2. 「隠し記事(isHidden)」は、フラグ(isTruthRevealed)が立っていないと隠す
    if (article.isHidden && !isTruthRevealed) return false;

    return true;
  });

  // 日付順に並び替え（そのまま）
  const sortedArticles = allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <aside id="sidebar">
      <div className="widget profile-widget">
        <h3 className="widget-title">プロフィール</h3>
        <div className="widget-body">
          <img src="images/profile-coffee.jpg" alt="コーヒーカップ" className="profile-image" />
          <p className="profile-name">湊 (Minato)</p>
          <p className="profile-bio">静かな場所が好きです。好きなもの: 深煎りコーヒー、白黒映画、水。</p>
          <Link to="/home/profile">» プロフィール詳細へ</Link>
        </div>
      </div>

      <div className="widget latest-articles-widget">
        <h3 className="widget-title">全ての記事</h3>
        <ul className="widget-list">
          {sortedArticles.map(article => (
            <li key={article.id}>
              <Link to={`/home/article/${article.id}`}>
                {article.title}
                {article.isProtected && <span style={{ marginLeft: '5px', color: '#999' }}>[鍵]</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  );
};

export default Sidebar;