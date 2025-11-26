// src/pages/ArticlePage.jsx (★★★★★ これが、最後の、本当の、絶対的な正義です ★★★★★)
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PasswordPrompt from '../components/PasswordPrompt';
import ContentRenderer from '../components/ContentRenderer'; // ← ★★★ 天才書記官を、呼び出すことを、思い出します ★★★
import FinalChoice from '../components/FinalChoice';
import { useArticleNavigation } from '../hooks/useArticleNavigation';
import { articles } from '../data/gameData';

const ArticlePage = () => {
  const { articleId = '1' } = useParams();
  const article = articles[articleId];
  
  const [unlocked, setUnlocked] = useState({});
  const [showFinalChoice, setShowFinalChoice] = useState(false);
  
  const { prevArticle, nextArticle } = useArticleNavigation(articleId);

  useEffect(() => {
    setShowFinalChoice(false);
  }, [articleId]);

  const handleCorrectPassword = (id) => setUnlocked({ ...unlocked, [id]: true });
  const handleFinalArticleClick = () => { if (article?.isFinal) setShowFinalChoice(true); };

  if (!article) return <p>記事が見つかりません。<Link to="/">ブログのトップへ</Link></p>;
  const showContent = !article.isProtected || unlocked[articleId];

  return (
    <>
      <div className={`glitch-overlay ${showFinalChoice ? 'active' : ''}`}></div>
      <article className="post">
        <h2 className="article-title">{showContent ? article.title : article.theme}</h2>
        <p className="article-meta"><time>{article.date}</time> | <span className="category">{article.theme}</span></p>
        
        <div className="article-body">
          {showContent ? (
            <div onClick={handleFinalArticleClick}>
              
              {/* ★★★ ここが、最後の、そして、最も重要な、修正です ★★★ */}
              {/* ★★★ 天才書記官に、仕事の全てを、委ねます ★★★ */}
              <ContentRenderer content={article.content} />
              
              {article.isFinal && !showFinalChoice && (
                  <div style={{ border: '1px dashed #999', padding: '10px', marginTop: '20px', textAlign: 'center', color: '#777' }}>
                    <p>読み終えたら、画面のどこかをクリックしてください。</p>
                  </div>
              )}
            </div>
          ) : (
            <PasswordPrompt 
              articleId={articleId} 
              hint={article.hint} 
              onCorrectPassword={handleCorrectPassword}
            />
          )}
        </div>

        <FinalChoice isVisible={showFinalChoice} />
        
        {showContent && (
          <div className="article-navigation">
            {prevArticle && <Link to={`/home/article/${prevArticle.id}`}>&laquo; 前の記事へ: {prevArticle.title}</Link>}
            {nextArticle && <Link to={`/home/article/${nextArticle.id}`} style={{ marginLeft: 'auto' }}>次の記事へ: {nextArticle.title} &raquo;</Link>}
          </div>
        )}
      </article>
    </>
  );
};

export default ArticlePage;