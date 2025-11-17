// src/pages/ArticlePage.jsx (★★★★★ 最終完成版 ★★★★★)
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PasswordPrompt from '../components/PasswordPrompt';
import { articles } from '../data/gameData';

const getSortedArticles = () => {
  return Object.values(articles).sort((a, b) => new Date(a.date) - new Date(b.date));
};

const ArticlePage = () => {
  const { articleId = '1' } = useParams();
  const article = articles[articleId];
  const navigate = useNavigate();

  const [unlocked, setUnlocked] = useState({});
  const [showFinalChoice, setShowFinalChoice] = useState(false);

  useEffect(() => { setShowFinalChoice(false); }, [articleId]);

  const handleCorrectPassword = (id) => setUnlocked({ ...unlocked, [id]: true });
  const handleChoice = (endingId) => navigate(`/ending/${endingId}`);
  const handleFinalArticleClick = () => { if (article?.isFinal) setShowFinalChoice(true); };

  const sortedArticles = getSortedArticles();
  const currentIndex = sortedArticles.findIndex(a => a.id === articleId);
  const prevArticle = sortedArticles[currentIndex - 1];
  const nextArticle = sortedArticles[currentIndex + 1];

  if (!article) return <p>記事が見つかりません。<Link to="/">ブログのトップへ</Link></p>;
  const showContent = !article.isProtected || unlocked[articleId];

  return (
    <>
      <div className={`glitch-overlay ${showFinalChoice ? 'active' : ''}`}></div>
      <article className="post">
        <h2 className="article-title">{showContent ? article.title : article.theme}</h2>
        <p className="article-meta">
          <time>{article.date} 10:00:00</time> | <span className="category">{article.theme}</span>
        </p>

        {/* ★★★ ここからが、最後の、そして、最も重要な、修正です ★★★ */}
        <div className="article-body">
          {showContent ? (
            // 本文が表示されている時だけ、クリックイベントを仕掛ける
            <div onClick={handleFinalArticleClick}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{article.content}</p>
              {article.image && <img src={article.image} alt="記事の画像" style={{ maxWidth: '300px', border: '1px solid #ccc', marginTop: '15px' }}/>}
              
              {article.isFinal && (
                !showFinalChoice ? (
                  <div style={{ border: '1px dashed #999', padding: '10px', marginTop: '20px', textAlign: 'center', color: '#777' }}>
                    <p>読み終えたら、画面のどこかをクリックしてください。</p>
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
            // パスワード画面には、クリックイベントは仕掛けない
            <PasswordPrompt articleId={articleId} hint={article.hint} onCorrectPassword={handleCorrectPassword} />
          )}
        </div>
        {/* ★★★ ここまでが、最後の、そして、最も重要な、修正です ★★★ */}

        <div className="article-navigation">
          {prevArticle ? (
            <Link to={`/article/${prevArticle.id}`}>&laquo; 前の記事へ: {prevArticle.title}</Link>
          ) : (
            <span>&nbsp;</span>
          )}
          {nextArticle ? (
            <Link to={`/article/${nextArticle.id}`}>次の記事へ: {nextArticle.title} &raquo;</Link>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
      </article>
    </>
  );
};
export default ArticlePage;