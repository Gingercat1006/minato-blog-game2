// src/App.jsx
import React, { useState } from 'react';
// ★★★ ここでは Routes, Route だけを使います（Routerは消す） ★★★
import { Routes, Route } from 'react-router-dom';

import BlogLayout from './components/BlogLayout';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import EndingPage from './pages/EndingPage';
import ThemePage from './pages/ThemePage';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import GameClearPage from './pages/GameClearPage';

// カスタムフック
import { useScrollToTop } from './hooks/useGameLogic';

function App() {
  // ★★★ main.jsxで包んだおかげで、ここでフックを使ってもエラーになりません！ ★★★
  useScrollToTop();

  const [unlocked, setUnlocked] = useState({});
  const [isTruthRevealed, setIsTruthRevealed] = useState(false);

  const handleCorrectPassword = (id) => {
    setUnlocked(prev => ({ ...prev, [id]: true }));
  };

  const handleUnlockTruth = () => {
    if (!isTruthRevealed) {
      setIsTruthRevealed(true);
      alert("【新着通知】\n\n記事が新しく更新されました。\nタイトル：【最新】真実");
    }
  };

  return (
    // ★★★ <Router>タグは削除し、いきなり <Routes> で始めます ★★★
    <Routes>
      <Route path="/" element={<IntroPage />} />
      
      <Route path="/home" element={<BlogLayout isTruthRevealed={isTruthRevealed} />}>
        
        <Route index element={<HomePage isTruthRevealed={isTruthRevealed} />} />
        
        <Route 
          path="article/:articleId" 
          element={
            <ArticlePage 
              unlocked={unlocked} 
              onCorrectPassword={handleCorrectPassword} 
            />
          } 
        />
        
        <Route 
          path="profile" 
          element={<ProfilePage onUnlockTruth={handleUnlockTruth} />} 
        />
        
        <Route path="theme/:themeName" element={<ThemePage isTruthRevealed={isTruthRevealed} />} />
      </Route>

      <Route path="/ending/:endingId" element={<EndingPage />} />
      <Route path="/gameclear" element={<GameClearPage />} />
    </Routes>
  );
}

export default App;