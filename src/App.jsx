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
  //  ここで「記憶」を一元管理します 
  const [unlocked, setUnlocked] = useState({});

  //  記憶を書き込むための関数です
  const handleCorrectPassword = (id) => {
    setUnlocked(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<IntroPage />} />
        
        <Route path="/home" element={<BlogLayout />}>
          <Route index element={<HomePage />} />
          
          {/* ここが重要！記憶（unlocked）と、書き込み係（handle...）を渡す */}
          <Route 
            path="article/:articleId" 
            element={
              <ArticlePage 
                unlocked={unlocked} 
                onCorrectPassword={handleCorrectPassword} 
              />
            } 
          />
          
          <Route path="profile" element={<ProfilePage />} />
          <Route path="theme/:themeName" element={<ThemePage />} />
        </Route>

        <Route path="/ending/:endingId" element={<EndingPage />} />
        <Route path="/gameclear" element={<GameClearPage />} />
      </Routes>
    </Router>
  );
}
export default App;