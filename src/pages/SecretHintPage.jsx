// src/pages/SecretHintPage.jsx (新規作成)
import React, { useState } from 'react'; // ← useStateという、魔法の道具を、インポートします
import '../css/SecretHintPage.css'; // ← 序章の、美しいデザインを、再利用します

const hints = [
    {
      id: 1,
      q: 'xs4とは何を指している？',
      a: 'かな入力で「さとう」を打つキー配置。',
    },
    {
      id: 2,
      q: 'なぜ「手元をよく見て」なのか？',
      a: '答えはキーボード上にあるから。',
    },
    {
      id: 3,
      q: 'これは誰の名前を示している？',
      a: '佐藤（satou）。',
    },
  ];
  
  const SecretHintPage = () => {
    const [open, setOpen] = useState({});
  
    const toggle = (id) => {
      setOpen(prev => ({
        ...prev,
        [id]: !prev[id],
      }));
    };
  
    return (
      <div className="secret-hint">
        <div className="intro-box">
  
          <h1>隠されたヒント</h1>
  
          <div style={{ textAlign: 'left' }}>
            {hints.map(hint => (
              <div key={hint.id}>
  
                {/* 問い */}
                <div
                  className="hint-question"
                  onClick={() => toggle(hint.id)}
                >
                  <h2>【問い】</h2>
                  <p>
                    {hint.q}
                    <span className="click-indicator">
                      {open[hint.id]
                        ? '（もう一度クリックで、答えを隠す）'
                        : '（クリックで、答えを見る）'}
                    </span>
                  </p>
                </div>
  
                {/* 答え */}
                {open[hint.id] && (
                  <div className="hint-answer">
                    <h2>【答え】</h2>
                    <p>{hint.a}</p>
                  </div>
                )}
  
              </div>
            ))}
          </div>
  
        </div>
      </div>
    );
  };
  
  export default SecretHintPage;