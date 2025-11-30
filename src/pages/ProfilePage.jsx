// frontend/src/pages/ProfilePage.jsx
import React from 'react';

const ProfilePage = () => {
  return (
    <article className="post">
      <h2 className="article-title">プロフィール詳細</h2>
      <div className="article-body">
        <h4>HN</h4>
        <p>湊 (Minato)</p>
        <h4>自己紹介</h4>
        <p>静かな場所が好きです。日々のことを綴ります。このブログは、私の“記録”です。</p>
        <h4>好きなもの</h4>
        <p>深煎りコーヒー、白黒映画、水。</p>
        <h4>SNSなど</h4>
        <p>やっていません。</p>
      </div>
    </article>
  );
};

export default ProfilePage;