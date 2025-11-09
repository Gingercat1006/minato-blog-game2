import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import BlogLayout from './components/BlogLayout';
import ArticlePage from './pages/ArticlePage';
import ProfilePage from './pages/ProfilePage';
import EndingPage from './pages/EndingPage';
import ThemePage from './pages/ThemePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogLayout />}>
          <Route index element={<Navigate to="/article/1" replace />} />
          <Route path="article/:articleId" element={<ArticlePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="theme/:themeName" element={<ThemePage />} />
        </Route>
        <Route path="/ending/:endingId" element={<EndingPage />} />
      </Routes>
    </Router>
  );
}
export default App;