// src/pages/HomePage.jsx (★★★★★ 最終完成版 ★★★★★)
import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/gameData';

// ★★★ ここからが、このゲームの、最後の、そして、最も強力な魔法です ★★★

// 呪文①：全ての「監督命令」を、脚本から消し去る、浄化の呪文
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

// ★★★ ここまでが、このゲームの、最後の、そして、最も強力な魔法です ★★★


const HomePage = () => {
  const allArticles = Object.values(articles).filter(article => !article.isFinal);
  const sortedArticles = allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h2 className="article-title">全ての記事</h2>
      
      <ul className="theme-article-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
        {sortedArticles.map(article => (
          <li key={article.id} style={{ marginBottom: '20px', borderBottom: '1px dotted #ccc', paddingBottom: '20px' }}>
            
            <p className="article-meta" style={{ margin: '0 0 8px 0' }}>
              <time>{article.date}</time> | 
              <span className="category">{article.theme}</span>
            </p>

            <Link to={`/article/${article.id}`} style={{ fontSize: '20px', textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>
              {article.title} 
              {article.isProtected && <span style={{ marginLeft: '10px', color: '#999' }}>[鍵]</span>}
            </Link>
            
            {article.isProtected ? (
              <p style={{ margin: '8px 0 0', color: '#666', fontStyle: 'italic' }}>
                この記事はパスワードで保護されています...
              </p>
            ) : (
              <p style={{ margin: '8px 0 0', color: '#666' }}>
                {/* ★★★ ここで、2つの魔法を、同時に、唱えます ★★★ */}
                {truncateText(stripCommands(article.content), 100)}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;