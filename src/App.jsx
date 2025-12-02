import React from 'react';
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

// ページの遷移を実現
function App() {
  return (
    <Router>
      <ScrollToTop />
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
    </Router>
  );
}
export default App;