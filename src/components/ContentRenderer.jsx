// src/components/ContentRenderer.jsx (★★★★★ これが、最後の、本当の、絶対的な正義です ★★★★★)
import React from 'react';
import { Link } from 'react-router-dom';

const ContentRenderer = ({ content }) => {
  // ★★★ ここが、最後の、そして、最も重要な、修正です ★★★
  // ★★★ 魔法のナイフに、「LINK」という、新しい印を、教えます ★★★
  const parts = content.split(/(\[HIDDEN\].*?\[\/HIDDEN\]|\[IMAGE:.+?\]|\[LINK:.+?\])/g);

  return parts.map((part, index) => {
    if (part.startsWith('[IMAGE:')) {
      const imageUrl = part.substring(7, part.length - 1);
      return <img key={index} src={imageUrl} alt="記事の画像" style={{ maxWidth: '300px', border: '1px solid #ccc', marginTop: '15px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />;
    }
    
    if (part.startsWith('[HIDDEN]')) {
      const hiddenText = part.substring(8, part.length - 9);
      return <span key={index} className="hidden-text">{hiddenText}</span>;
    }

    // ★★★ これで、あなたの、新しい魔法が、発動します ★★★
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