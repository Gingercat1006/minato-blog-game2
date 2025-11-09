// frontend/src/components/BlogLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom'; // ★Outletをインポート
import Header from './Header';
import Sidebar from './Sidebar';

const BlogLayout = () => (
  <div id="container">
    <Header />
    <div id="main-wrapper">
      <main id="content">
        <Outlet /> {/* ★★★ ここが中身のページの表示場所になる ★★★ */}
      </main>
      <Sidebar />
    </div>
    <footer id="footer">
      <p>Copyright &copy; Minato's Room. All Rights Reserved.</p>
    </footer>
  </div>
);

export default BlogLayout;