// src/pages/GameClearPage.jsx
import React from 'react';
import '../css/IntroPage.css';

const GameClearPage = () => {
  const surveyUrl = "https://forms.office.com/r/GV3W610kqU";

  //「最初から」ボタンを押したときの処理
  const handleReplay = (e) => {
    e.preventDefault();
    // 修正箇所：シンプルにトップページ('/')へ移動させる
    window.location.href = '/'; 
  };

  return (
    <div className="intro-container">
      <div className="intro-box">
        <h1>全ての記録を見つけ出してくれて、ありがとう。</h1>
        <p style={{ textAlign: 'center' }}>
          これにて「湊の個人ブログ」の物語は、終わりです。<br /><br />
          もしよろしければ、<br />
          あなたの、この物語体験についての「声」をお聞かせください。<br />
          新しい物語の、参考にさせていただきます。
        </p>
        
        {/* アンケートボタン */}
        <a href={surveyUrl} target="_blank" rel="noopener noreferrer" className="button">
          アンケートに答える
        </a>

        <div style={{ marginTop: '30px', fontSize: '14px' }}>
          {/*ここを修正: クリックでリロード処理を実行*/}
          <a href="#" onClick={handleReplay} style={{ color: '#888' }}>
            もう一度、最初からプレイする
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameClearPage;