// src/hooks/useGameLogic.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { articles } from '../data/gameData';

const GameContext = createContext();
export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  // --- 1. 記憶（鍵） ---
  const [unlocked, setUnlocked] = useState({});
  const unlockArticle = (id) => {
    setUnlocked(prev => ({ ...prev, [id]: true }));
  };

  // --- 2. 隠しルート ---
  const [isTruthRevealed, setIsTruthRevealed] = useState(false);

  // --- 3. 通知（アラート）機能 ★追加★ ---
  const [notification, setNotification] = useState(null);
  const closeNotification = () => setNotification(null);

  // --- 4. 時間経過演出の状態管理 ---
  const [isTimeSkipping, setIsTimeSkipping] = useState(false);

  // ★★★ 演出用の関数（タイミング調整版） ★★★
  const triggerTimeSkip = (navigate) => {
    if (isTruthRevealed) return;

    // 1. 暗転開始
    setIsTimeSkipping(true);

    // 2. 暗転中にこっそりホームへ移動（まだ記事は追加しない！）
    setTimeout(() => {
      navigate('/home'); 
    }, 3500); // 3.5秒後

    // 3. 暗転を解除（プレイヤーは「あれ？何も変わってない？」と思う）
    setTimeout(() => {
      setIsTimeSkipping(false);
    }, 5000); // 5秒後

    // 4. 暗転明けから1.5秒後... 突然記事が追加され、通知が出る！
    setTimeout(() => {
      setIsTruthRevealed(true); // 真実解放！
      setNotification("【新着通知】\n\n記事が新しく更新されました。\nタイトル：【最新】真実");
    }, 6500); // 6.5秒後
  };

  // --- 5. モーダル ---
  const [modalImage, setModalImage] = useState(null);
  const openModal = (imageSrc) => setModalImage(imageSrc);
  const closeModal = () => setModalImage(null);

  const value = {
    unlocked,
    unlockArticle,
    isTruthRevealed,
    triggerTimeSkip,
    isTimeSkipping,
    modalImage,
    openModal,
    closeModal,
    notification,      // ★追加
    closeNotification  // ★追加
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

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
  let nextArticle = sortedArticles[currentIndex + 1];
  if (articleId === 'sdjkjklklj') {
    nextArticle = null;
  }
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