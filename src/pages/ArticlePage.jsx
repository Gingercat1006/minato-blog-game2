// src/pages/ArticlePage.jsx 
import '../css/ArticlePage.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PasswordPrompt from '../components/PasswordPrompt';
import ContentRenderer from '../components/ContentRenderer';
import FinalChoice from '../components/FinalChoice';
import { useArticleNavigation } from '../hooks/useArticleNavigation';
import { articles } from '../data/gameData';

// 親(App.jsx)から、unlocked と onCorrectPassword を受け取ります
const ArticlePage = ({ unlocked, onCorrectPassword }) => {
  const { articleId = '1' } = useParams();
  const article = articles[articleId];
  
  
  const [showFinalChoice, setShowFinalChoice] = useState(false);
  const { prevArticle, nextArticle } = useArticleNavigation(articleId);

  useEffect(() => {
    setShowFinalChoice(false);
  }, [articleId]);


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
  
  // 親から貰った unlocked を見て、表示するか決めます 
  const showContent = !article.isProtected || unlocked[articleId];

  return (
    <>
      <div className={`glitch-overlay ${showFinalChoice ? 'active' : ''}`}></div>
      <article className="post">
        <h2 className="article-title">{article.title}</h2>
        <p className="article-meta"><time>{article.date} 10:00:00</time> | <span className="category">{article.theme}</span></p>
        
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
              onCorrectPassword={onCorrectPassword} //  親の関数を渡します
            />
          )}
        </div>

        <FinalChoice isVisible={showFinalChoice} />
        
        <div className="article-navigation">
          {prevArticle && <Link to={`/home/article/${prevArticle.id}`}>&laquo; 前の記事へ: {prevArticle.title}</Link>}
          {nextArticle && <Link to={`/home/article/${nextArticle.id}`} style={{ marginLeft: 'auto' }}>次の記事へ: {nextArticle.title} &raquo;</Link>}
        </div>
      </article>
    </>
  );
};

export default ArticlePage;