// frontend/src/pages/ThemePage.jsx (新規作成)
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/gameData';

const ThemePage = () => {
  // URLからテーマ名を取得 (例: "日常")
  const { themeName } = useParams();

  // 全記事の中から、URLのテーマ名と一致する記事だけを絞り込む
  const filteredArticles = Object.values(articles).filter(
    article => article.theme === themeName && !article.isProtected
  );

  return (
    <div>
      <h2 className="article-title">テーマ: {themeName}</h2>
      
      {/* 絞り込んだ記事のリストを生成 */}
      <ul className="theme-article-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
        {filteredArticles.map(article => (
          <li key={article.id} style={{ marginBottom: '15px', borderBottom: '1px dotted #ccc', paddingBottom: '15px' }}>
            <Link to={`/article/${article.id}`} style={{ fontSize: '18px', textDecoration: 'none', color: '#0066cc' }}>
              {article.title}
            </Link>
            <p style={{ margin: '5px 0 0', color: '#666' }}>
              {/* 記事の冒頭部分をプレビュー表示 */}
              {article.content.substring(0, 50)}...
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemePage;