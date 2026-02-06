// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- コンポーネント ---
import BlogLayout from './components/BlogLayout';
import Modal from './components/Modal';
import NotificationModal from './components/NotificationModal';

// --- ページ ---
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import ThemePage from './pages/ThemePage';
import EndingPage from './pages/EndingPage';
import GameClearPage from './pages/GameClearPage';
import SecretHintPage from './pages/SecretHintPage';

// --- フックとプロバイダー ---
import { useScrollToTop, GameProvider, useGame } from './hooks/useGameLogic.jsx';

// OverlayRenderer に「暗転演出」
const OverlayRenderer = () => {
  // isTimeSkipping を追加で受け取ります
  const { 
    modalImage, closeModal, 
    notification, closeNotification, 
    isTimeSkipping 
  } = useGame();
  
  return (
    <>
      {/* 1. 画像モーダル */}
      {modalImage && <Modal imageSrc={modalImage} onClose={closeModal} />}
      
      {/* 2. 通知モーダル */}
      {notification && <NotificationModal message={notification} onClose={closeNotification} />}

      {/* 3. 時間経過（暗転）演出 */}
      <div className={`story-overlay ${isTimeSkipping ? 'active' : ''}`}>
        {isTimeSkipping && <p className="fade-text">数日後...</p>}
      </div>
    </>
  );
};

// ルーティング部分
const AppRoutes = () => {
  useScrollToTop(); 

  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/home/hint" element={<SecretHintPage />}></Route>
      <Route path="/home" element={<BlogLayout />}>
        <Route index element={<HomePage />} />
        <Route path="article/:articleId" element={<ArticlePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="theme/:themeName" element={<ThemePage />} />
      </Route>

      <Route path="/ending/:endingId" element={<EndingPage />} />
      <Route path="/gameclear" element={<GameClearPage />} />
    </Routes>
  );
};

function App() {
  return (
    <GameProvider>
      <AppRoutes />
      <OverlayRenderer />
    </GameProvider>
  );
}

export default App;