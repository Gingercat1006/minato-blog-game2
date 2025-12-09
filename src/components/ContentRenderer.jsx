// src/components/ContentRenderer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../hooks/useGameLogic'; // ★追加

const ContentRenderer = ({ content }) => {
  // ★★★ 放送局から openModal をもらう ★★★
  const { openModal } = useGame();

  const parts = content.split(/(\[HIDDEN\].*?\[\/HIDDEN\]|\[IMAGE:.+?\]|\[LINK:.+?\])/g);
  
  return parts.map((part, index) => {
    {/*画像処理*/}
    if (part.startsWith('[IMAGE:')) {
      const imageUrl = part.substring(7, part.length - 1);
      return (
        <img 
          key={index} 
          src={imageUrl} 
          alt="記事の画像" 
          style={{ maxWidth: '300px', border: '1px solid #ccc', marginTop: '15px', display: 'block', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }} 
          onClick={() => openModal(imageUrl)} // ★ここで使う
        />
      );
    }
    
    {/* (以下の処理はそのまま) */}
    if (part.startsWith('[HIDDEN]')) {
      const hiddenText = part.substring(8, part.length - 9);
      return <span key={index} className="hidden-text">{hiddenText}</span>;
    }

    if (part.startsWith('[LINK:')) {
      const inner = part.substring(6, part.length - 1);
      const [url, text] = inner.split('|');
      return (
        <div key={index} style={{ marginTop: '30px' }}>
          <Link to={url}>{text}</Link>
        </div>
      );
    }

    if (part.trim() === '') return null;
    return <p key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</p>;
  });
};

export default ContentRenderer;