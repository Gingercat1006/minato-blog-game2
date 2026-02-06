// src/pages/SecretHintPage.jsx (新規作成)
import React from 'react';
import '../css/IntroPage.css'; // ← 序章の、美しいデザインを、再利用します

const SecretHintPage = () => {
  return (
    <div className="intro-container">
      <div className="intro-box">
        <h1>隠されたヒント</h1>
        <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
          "xs4"
          <br /><br />
          それは、彼が、チャットで使っていた、古いハンドルネーム。
          <br />
          指が、覚えている、その、無意識の刻印。
        </p>
      </div>
    </div>
  );
};

export default SecretHintPage;