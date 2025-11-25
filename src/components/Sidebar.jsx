// src/components/Sidebar.jsx (改装後)
import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/gameData';
import Calendar from './Calendar';
const Sidebar = () => {
  // ★★★ 全ての記事を、対象にします ★★★
  const allArticles = Object.values(articles).filter(article => !article.isFinal);
  // 記事IDの降順（新しい順）に並び替える
  const sortedArticles = allArticles.sort((a, b) => b.id - a.id);

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

      {/* ★★★「最新記事」ウィジェットを、改装 ★★★ */}
      <div className="widget latest-articles-widget">
        <h3 className="widget-title">全ての記事</h3>
        <ul className="widget-list">
          {/* 新しい順に並べた記事のリストを生成 */}
          {sortedArticles.map(article => (
            <li key={article.id}>
              <Link to={`/article/${article.id}`}>
                {article.title}
                {/* ★★★ 保護された記事には、鍵マークを表示します ★★★ */}
                {article.isProtected && <span style={{ marginLeft: '5px', color: '#999' }}>[鍵]</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* --- カレンダーウィジェット (変更なし) --- */}
      <div className="widget calendar-widget">
        <h3 className="widget-title">過去ログ</h3>
        <div className="widget-body"><Calendar /> {/* ★★★ ここで、魔法使いを召喚します ★★★ */}
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;