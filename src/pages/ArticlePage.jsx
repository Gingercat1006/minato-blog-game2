// src/pages/ArticlePage.jsx 
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PasswordPrompt from '../components/PasswordPrompt';
import ContentRenderer from '../components/ContentRenderer';
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

  if (!article) {
    return (
      <article className="post">
        <h2 className="article-title">記事が見つかりません</h2>
        <div className="article-body">
          <Link to="/home">ブログのトップへ戻る</Link>
        </div>
      </article>
    );
  }
  
  const showContent = !article.isProtected || unlocked[articleId];

  return (
    <>
      <div className={`glitch-overlay ${showFinalChoice ? 'active' : ''}`}></div>
      <article className="post">
        <h2 className="article-title">{article.title}</h2>
        <p className="article-meta"><time>{article.date}</time> | <span className="category">{article.theme}</span></p>
        
        <div className="article-body">
          {showContent ? (
            <div onClick={handleFinalArticleClick}>
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
        
        {/* 前の記事へ、次の記事へのid受け渡し */}
        <div className="article-navigation">
          {prevArticle && <Link to={`/home/article/${prevArticle.id}`}>&laquo; 前の記事へ: {prevArticle.title}</Link>}
          {nextArticle && <Link to={`/home/article/${nextArticle.id}`} style={{ marginLeft: 'auto' }}>次の記事へ: {nextArticle.title} &raquo;</Link>}
        </div>
      </article>
    </>
  );
};

export default ArticlePage;