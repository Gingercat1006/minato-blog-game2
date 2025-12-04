// src/pages/ThemePage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/gameData';

// テキストを短くする関数（HomePageと同じ）
const stripCommands = (content) => {
  return content.replace(/(\[HIDDEN\].*?\[\/HIDDEN\]|\[IMAGE:.+?\]|\[LINK:.+?\])/g, '');
};
const truncateText = (text, length) => {
  const cleanedText = text.replace(/\n/g, ' ');
  if (cleanedText.length <= length) return cleanedText;
  return cleanedText.substring(0, length) + '...';
};

// isTruthRevealed を受け取るようにします
const ThemePage = ({ isTruthRevealed }) => {
  const { themeName } = useParams();

  const filteredArticles = Object.values(articles).filter(article => {
    // 1. テーマが一致しないものは除外
    if (article.theme !== themeName) return false;

    // 2. 従来の「最後の記事(isFinal)」は隠す（TrueEnd以外）
    if (article.isFinal && !article.isTrueEnd) return false;

    // 3. 「隠し記事(isHidden)」は、フラグ(isTruthRevealed)が立っていないと隠す
    if (article.isHidden && !isTruthRevealed) return false;

    return true;
  });

  return (
    <div>
      <h2 className="article-title">テーマ: {themeName}</h2>
      
      <ul className="theme-article-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
        {filteredArticles.map(article => (
          <li key={article.id} style={{ marginBottom: '20px', borderBottom: '1px dotted #ccc', paddingBottom: '20px', backgroundColor: article.theme === '緊急更新' ? '#fff0f0' : 'transparent' }}>
            <p className="article-meta" style={{ margin: '0 0 8px 0' }}>
              <time>{article.date}</time>
            </p>
            <Link to={`/home/article/${article.id}`} style={{ fontSize: '20px', textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>
              {article.title} 
              {article.isProtected && <span style={{ marginLeft: '10px', color: '#999' }}>[鍵]</span>}
            </Link>
            
            {article.isProtected ? (
              <p style={{ margin: '8px 0 0', color: '#666', fontStyle: 'italic' }}>
                この記事はパスワードで保護されています...
              </p>
            ) : (
              <p style={{ margin: '8px 0 0', color: '#666' }}>
                {truncateText(stripCommands(article.content), 100)}
              </p>
            )}
          </li>
        ))}
      </ul>
      
      {/* 記事がない場合のメッセージ */}
      {filteredArticles.length === 0 && (
        <p>この記事はまだありません。</p>
      )}
    </div>
  );
};

export default ThemePage;