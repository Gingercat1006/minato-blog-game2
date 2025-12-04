// src/App.jsx
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import BlogLayout from './components/BlogLayout';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import EndingPage from './pages/EndingPage';
import ThemePage from './pages/ThemePage';
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import ScrollToTop from './components/ScrollToTop';
import GameClearPage from './pages/GameClearPage';

function App() {
  // 記憶（鍵の解除状態）
  const [unlocked, setUnlocked] = useState({});
  // 隠しルート解放フラグ（最初は false）
  const [isTruthRevealed, setIsTruthRevealed] = useState(false);

  // 鍵解除時の処理
  const handleCorrectPassword = (id) => {
    setUnlocked(prev => ({ ...prev, [id]: true }));
  };

  // チャットで謎を解いた時に実行される関数
  const handleUnlockTruth = () => {
    // まだ解放されていない場合のみ実行
    if (!isTruthRevealed) {
      setIsTruthRevealed(true); // フラグをONにする
      // ブラウザのアラートを出す
      alert("【新着通知】\n\n記事が新しく更新されました。\nタイトル：【最新】真実");
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<IntroPage />} />
        
        {/*BlogLayoutに isTruthRevealed を渡して、サイドバーに伝える*/}
        <Route path="/home" element={<BlogLayout isTruthRevealed={isTruthRevealed} />}>
          
          {/* HomePageにも渡して、一覧に表示させる */}
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
          
          {/*【重要】ProfilePage に handleUnlockTruth を渡す！ */}
          <Route 
            path="profile" 
            element={<ProfilePage onUnlockTruth={handleUnlockTruth} />} 
          />
          
          {/* ThemePageにも渡す */}
          <Route path="theme/:themeName" element={<ThemePage isTruthRevealed={isTruthRevealed} />} />
        </Route>

        <Route path="/ending/:endingId" element={<EndingPage />} />
        <Route path="/gameclear" element={<GameClearPage />} />
      </Routes>
    </Router>
  );
}
export default App;