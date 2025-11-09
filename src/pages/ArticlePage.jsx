// frontend/src/pages/ArticlePage.jsx (★★★★★ 最終修正版 ★★★★★)
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PasswordPrompt from '../components/PasswordPrompt';
import { articles } from '../data/gameData';

const ArticlePage = () => {
  const { articleId = '1' } = useParams();
  const article = articles[articleId];
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState({});
  const [showFinalChoice, setShowFinalChoice] = useState(false);

  useEffect(() => {
    setShowFinalChoice(false);
  }, [articleId]);

  const handleCorrectPassword = (id) => setUnlocked({ ...unlocked, [id]: true });
  const handleChoice = (endingId) => navigate(`/ending/${endingId}`);
  const handleFinalArticleClick = () => {
    if (article?.isFinal) setShowFinalChoice(true);
  };

  if (!article) return <p>記事が見つかりません。<Link to="/article/1">ブログのトップへ</Link></p>;

  const showContent = !article.isProtected || unlocked[articleId];

  return (
    <>
      <div className={`glitch-overlay ${showFinalChoice ? 'active' : ''}`}></div>
      <article className="post">
        <h2 className="article-title">{showContent ? article.title : article.theme}</h2>
        <p className="meta"><time>2025-11-07 10:00:00</time> | <span className="category">{article.theme}</span></p>
        <div className="article-body">
          {showContent ? (
            <div>
              {/* ★★★ クリックイベントを、リンクを含まない部分だけに限定 ★★★ */}
              <div onClick={handleFinalArticleClick}>
                <p style={{ whiteSpace: 'pre-wrap' }}>{article.content}</p>
                {article.image && <img src={article.image} alt="子供の絵" style={{ maxWidth: '300px', border: '1px solid #ccc', marginTop: '15px' }}/>}
              </div>

              {/* ★★★ リンク表示部分を、クリックイベントの外に分離 ★★★ */}
              {article.nextLink && (
                <div style={{ marginTop: '30px' }}>
                  <Link to={article.nextLink}>{article.nextLinkText || '» 続きを読む'}</Link>
                </div>
              )}
              
              {article.isFinal && (
                !showFinalChoice ? (
                  <div onClick={handleFinalArticleClick} style={{ cursor: 'pointer', border: '1px dashed #999', padding: '10px', marginTop: '20px', textAlign: 'center', color: '#777' }}>
                    <p>読み終えたら、ここをクリックしてください。</p>
                  </div>
                ) : (
                  <div className={'final-choice active'}>
                    <h3>あなたはどうしますか？</h3>
                    <button onClick={() => handleChoice('1')}>警察に通報する</button>
                    <button onClick={() => handleChoice('2')}>……見過ごす</button>
                  </div>
                )
              )}
            </div>
          ) : (
            <PasswordPrompt articleId={articleId} hint={article.hint} onCorrectPassword={handleCorrectPassword} />
          )}
        </div>
      </article>
    </>
  );
};

export default ArticlePage;