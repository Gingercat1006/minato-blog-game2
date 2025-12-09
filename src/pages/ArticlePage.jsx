// src/pages/ArticlePage.jsx 
import '../css/ArticlePage.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PasswordPrompt from '../components/PasswordPrompt';
import ContentRenderer from '../components/ContentRenderer';
import FinalChoice from '../components/FinalChoice';
import { useArticleNavigation } from '../hooks/useGameLogic';
import { articles } from '../data/gameData';
import { useGame } from '../hooks/useGameLogic'; // ★追加

const ArticlePage = () => { // propsは削除
  const { articleId = '1' } = useParams();
  const article = articles[articleId];
  const navigate = useNavigate();
  
  // ★★★ 放送局から直接データをもらう！ ★★★
  const { unlocked, unlockArticle } = useGame(); 

  const [showFinalChoice, setShowFinalChoice] = useState(false);
  const { prevArticle, nextArticle } = useArticleNavigation(articleId);

  useEffect(() => {
    setShowFinalChoice(false);
  }, [articleId]);

  const handleFinalArticleClick = () => { 
    if (article?.isFinal && !article.isTrueEnd) {
      setShowFinalChoice(true); 
    }
  };

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
              {/* ContentRenderer は自分で openModal を取得するように修正します */}
              <ContentRenderer content={article.content} />
              
              {article.isTrueEnd && (
                 <div className="final-choice active" style={{marginTop: '40px'}}>
                    <h3>決断の時</h3>
                    <button onClick={() => navigate('/ending/4')}>終幕へ</button>
                 </div>
              )}

              {article.isFinal && !article.isTrueEnd && !showFinalChoice && (
                  <div style={{ border: '1px dashed #999', padding: '10px', marginTop: '20px', textAlign: 'center', color: '#777' }}>
                    <p>読み終えたら、画面のどこかをクリックしてください。</p>
                  </div>
              )}
            </div>
          ) : (
            <PasswordPrompt 
              articleId={articleId} 
              hint={article.hint} 
              onCorrectPassword={() => unlockArticle(articleId)} // ★ここ修正
            />
          )}
        </div>

        {!article.isTrueEnd && <FinalChoice isVisible={showFinalChoice} />}
        
        <div className="article-navigation">
          {prevArticle && <Link to={`/home/article/${prevArticle.id}`}>&laquo; 前の記事へ: {prevArticle.title}</Link>}
          {nextArticle && <Link to={`/home/article/${nextArticle.id}`} style={{ marginLeft: 'auto' }}>次の記事へ: {nextArticle.title} &raquo;</Link>}
        </div>
      </article>
    </>
  );
};

export default ArticlePage;