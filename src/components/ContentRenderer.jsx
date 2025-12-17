// src/components/ContentRenderer.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../hooks/useGameLogic.jsx';

const ContentRenderer = ({ content }) => {
  const { isTruthRevealed, openModal } = useGame();

  const parts = content.split(/(\[HIDDEN\].*?\[\/HIDDEN\]|\[IMAGE:.+?\]|\[LINK:.+?\])/g);

  return parts.map((part, index) => {
    // --- 画像処理 ---
    if (part.startsWith('[IMAGE:')) {
      const imageUrl = part.substring(7, part.length - 1);
      return (
        <img 
          key={index} 
          src={imageUrl} 
          alt="記事の画像" 
          className="article-image"
          onClick={() => openModal(imageUrl)} 
        />
      );
    }
    
    // --- 白文字処理 ---
    if (part.startsWith('[HIDDEN]')) {
      const hiddenText = part.substring(8, part.length - 9);
      return <span key={index} className="hidden-text">{hiddenText}</span>;
    }

    // --- リンク処理 ---
    if (part.startsWith('[LINK:')) {
      if (isTruthRevealed) {
        return null;
      }
      const inner = part.substring(6, part.length - 1);
      const [url, text] = inner.split('|');
      return (
        <div key={index} className="special-link-container">
          <Link to={url}>{text}</Link>
        </div>
      );
    }

    if (part.trim() === '') return null;
    return <p key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</p>;
  });
};
export default ContentRenderer;