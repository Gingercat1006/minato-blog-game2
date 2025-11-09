// frontend/src/components/Sidebar.jsx (修正後)
import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/gameData';

const Sidebar = () => {
  const publicArticles = Object.values(articles).filter(article => !article.isProtected);

  const themes = publicArticles.reduce((acc, article) => {
    const theme = article.theme;
    if (theme) {
      if (!acc[theme]) {
        // ★★★ firstArticleIdはもう不要なので、カウントだけにする ★★★
        acc[theme] = { count: 0 };
      }
      acc[theme].count++;
    }
    return acc;
  }, {});

  return (
    <aside id="sidebar">
      {/* --- プロフィールウィジェット (変更なし) --- */}
      <div className="widget profile-widget">
        <h3 className="widget-title">プロフィール</h3>
        <div className="widget-body">
          <img src="images/profile-coffee.jpg" alt="コーヒーカップ" className="profile-image" />
          <p className="profile-name">湊 (Minato)</p>
          <p className="profile-bio">静かな場所が好きです。好きなもの: 深煎りコーヒー、白黒映画、水。</p>
          <Link to="/profile">» プロフィール詳細へ</Link>
        </div>
      </div>

      {/* --- テーマウィジェット (リンク先を修正) --- */}
      <div className="widget theme-widget">
        <h3 className="widget-title">テーマ</h3>
        <ul className="widget-list">
          {Object.entries(themes).map(([themeName, data]) => (
            <li key={themeName}>
              {/* ★★★ リンク先を /theme/テーマ名 に変更 ★★★ */}
              <Link to={`/theme/${themeName}`}>{themeName} ({data.count})</Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* --- カレンダーウィジェット (変更なし) --- */}
      <div className="widget calendar-widget">
        <h3 className="widget-title">過去ログ</h3>
        <div className="widget-body"><p>（ここにカレンダーUI）</p></div>
      </div>
    </aside>
  );
};

export default Sidebar;