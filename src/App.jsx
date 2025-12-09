import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- コンポーネント ---
import BlogLayout from './components/BlogLayout';
import Modal from './components/Modal';

// --- ページ ---
import IntroPage from './pages/IntroPage';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import ThemePage from './pages/ThemePage';
import EndingPage from './pages/EndingPage';
import GameClearPage from './pages/GameClearPage';

// --- フックとプロバイダー ---
import { useScrollToTop, GameProvider, useGame } from './hooks/useGameLogic.jsx';

// モーダル表示用の部品
const ModalRenderer = () => {
  const { modalImage, closeModal } = useGame();
  return modalImage ? <Modal imageSrc={modalImage} onClose={closeModal} /> : null;
};

// ルーティング部分
const AppRoutes = () => {
  useScrollToTop(); 

  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      
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
      <ModalRenderer />
    </GameProvider>
  );
}

export default App;