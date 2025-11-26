// src/components/Sidebar.jsx (★★★★★ 究極の最終形態 ★★★★★)
import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/gameData';

const Sidebar = () => {
  const allArticles = Object.values(articles).filter(article => !article.isFinal);
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
      
      {/* ★★★ カレンダーウィジェットの、全ての記憶を、ここから、完全に、消し去ります ★★★ */}

    </aside>
  );
};

export default Sidebar;