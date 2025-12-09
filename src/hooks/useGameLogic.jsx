import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { articles } from '../data/gameData'; // ここなら ../ で正しく読み込めます

// --- 1. Context（放送局）の作成 ---
const GameContext = createContext();

// データを簡単に受け取るためのフック
export const useGame = () => useContext(GameContext);

// --- 2. Provider（状態管理の親玉） ---
export const GameProvider = ({ children }) => {
  // 記憶（鍵）
  const [unlocked, setUnlocked] = useState({});
  const unlockArticle = (id) => {
    setUnlocked(prev => ({ ...prev, [id]: true }));
  };

  // 隠しルート
  const [isTruthRevealed, setIsTruthRevealed] = useState(false);
  const unlockTruth = () => {
    if (!isTruthRevealed) {
      setIsTruthRevealed(true);
      alert("【新着通知】\n\n記事が新しく更新されました。\nタイトル：【最新】真実");
    }
  };

  // モーダル（画像拡大）
  const [modalImage, setModalImage] = useState(null);
  const openModal = (imageSrc) => setModalImage(imageSrc);
  const closeModal = () => setModalImage(null);

  // 全ての値をまとめる
  const value = {
    unlocked,
    unlockArticle,
    isTruthRevealed,
    unlockTruth,
    modalImage,
    openModal,
    closeModal
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// --- 3. 既存のフックたち ---
export const useScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export const useArticles = () => {
  const allArticles = Object.values(articles).filter(article => true);
  const sortedArticles = allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
  return { allArticles: sortedArticles };
};

export const useArticleNavigation = (articleId) => {
  const sortedArticles = Object.values(articles).sort((a, b) => new Date(a.date) - new Date(b.date));
  const currentIndex = sortedArticles.findIndex(a => a.id === articleId);
  const prevArticle = sortedArticles[currentIndex - 1];
  const nextArticle = sortedArticles[currentIndex + 1];
  return { prevArticle, nextArticle };
};

export const stripCommands = (content) => {
  return content.replace(/(\[HIDDEN\].*?\[\/HIDDEN\]|\[IMAGE:.+?\]|\[LINK:.+?\])/g, '');
};

export const truncateText = (text, length) => {
  const cleanedText = text.replace(/\n/g, ' ');
  if (cleanedText.length <= length) {
    return cleanedText;
  }
  return cleanedText.substring(0, length) + '...';
};