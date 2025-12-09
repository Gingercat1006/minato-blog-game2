// src/components/BlogLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
// GameContextから直接データをもらってもいいですが、
// 今はSidebarやOutletの中身が自分でデータを取りに行くので、ここは単純な枠組みだけでOKです。

const BlogLayout = () => {
  return (
    <div id="container">
      <Header />
      <div id="main-wrapper">
        <main id="content">
          <Outlet />
        </main>
        <Sidebar /> {/* propsを渡す必要なし！ */}
      </div>
      <footer id="footer">
        <p>Copyright &copy; Minato's Room. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default BlogLayout;