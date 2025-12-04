// src/components/BlogLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

// 親(App)から isTruthRevealed を受け取る
const BlogLayout = ({ corruptionLevel = 0, isTruthRevealed }) => {
  return (
    <div id="container" className={`corruption-level-${corruptionLevel}`}>
      <Header />
      <div id="main-wrapper">
        <main id="content">
          <Outlet />
        </main>
        
        {/* Sidebar に isTruthRevealed を渡す */}
        <Sidebar isTruthRevealed={isTruthRevealed} />
        
      </div>
      <footer id="footer">
        <p>Copyright &copy; Minato's Room. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BlogLayout;