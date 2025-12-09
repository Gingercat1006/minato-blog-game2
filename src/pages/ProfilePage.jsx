// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
// ★★★ useGameLogic.jsx から useGame（万能フック）を読み込む ★★★
import { useGame } from '../hooks/useGameLogic.jsx';

const ProfilePage = () => {
  // ★★★ useGame() から「真実解放スイッチ」と「画像拡大機能」をもらう ★★★
  const { unlockTruth, openModal } = useGame();

  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const talkPatterns = [
    { 
      keywords: ['こんにちは', 'こんにちわ'], 
      replies: ['...こんにちは。', '...何か用ですか？']
    },
    {
      keywords: ['事件', '犯人', '復讐'],
      replies: ['...その話は、したくない。', '...あなたには、関係ないことだ。']
    }
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatHistory(prev => [...prev, { type: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    const msg = userMessage.toLowerCase();

    // --- 1. 正解判定 ---
    const correctKeywords = ['kasumiso-ko', 'kasumisouko', 'かすみそうこ', '霞倉庫', 'かんきんばしょはかすみそうこ。', '監禁場所は霞倉庫'];

    if (correctKeywords.some(keyword => msg.includes(keyword))) {
      setTimeout(() => {
        setIsTyping(false);
        setChatHistory(prev => [...prev, { type: 'admin', text: '...そこですか？ すぐに向かいます。ありがとう。' }]);
        
        // ★★★ 正解したら2秒後にアラートを出す ★★★
        setTimeout(() => {
          unlockTruth();
        }, 2000);
      }, 1500);
      return;
    }

    // --- 2. 通常会話 ---
    let replyText = null;
    const matchedPattern = talkPatterns.find(pattern => 
      pattern.keywords.some(keyword => msg.includes(keyword))
    );

    if (matchedPattern) {
      const randomIndex = Math.floor(Math.random() * matchedPattern.replies.length);
      replyText = matchedPattern.replies[randomIndex];
    }

    if (replyText) {
      const thinkingTime = Math.random() * 1000 + 1000;
      setTimeout(() => {
        setIsTyping(false);
        setChatHistory(prev => [...prev, { type: 'admin', text: replyText }]);
      }, thinkingTime);
    } else {
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <article className="post">
      <h2 className="article-title">プロフィール詳細</h2>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img 
          src="/images/profile-coffee.jpg" 
          alt="プロフィール画像" 
          className="profile-image"
          // ★★★ useGameからもらった openModal を使う ★★★
          onClick={() => openModal('/images/profile-coffee.jpg')}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className="article-body">
        <h4>HN</h4>
        <p>湊 (Minato)</p>
        <h4>自己紹介</h4>
        <p>静かな場所が好きです。日々のことを綴ります。このブログは、私の“記録”です。</p>
        <h4>好きなもの</h4>
        <p>深煎りコーヒー、白黒映画、水。</p>
        <h4>SNSなど</h4>
        <p>やっていません。</p>
        <p style={{ fontSize: '0.9em', color: '#666', marginTop: '20px' }}>
          記事への質問などがあれば、こちらへお願いします。<br/>
          ※全てに目を通しますが、いたずらや無関係な内容は返信しません。
        </p>

        {/* チャットエリア */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', marginTop: '10px', backgroundColor: '#f9f9f9' }}>
          <div style={{ height: '300px', overflowY: 'auto', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chatHistory.map((msg, index) => (
              <div key={index} style={{ 
                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.type === 'user' ? '#dcf8c6' : '#fff',
                padding: '8px 12px',
                borderRadius: '10px',
                maxWidth: '80%',
                fontSize: '14px',
                boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                whiteSpace: 'pre-wrap',
                border: msg.type === 'admin' ? '1px solid #eee' : 'none'
              }}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', color: '#aaa', fontSize: '12px', marginLeft: '10px' }}>
                湊が入力中...
              </div>
            )}
          </div>
          <form onSubmit={handleChatSubmit} style={{ display: 'flex', gap: '5px' }}>
            <input 
              type="text" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
              placeholder="メッセージを入力..." 
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '4px' }} disabled={isTyping}>
              送信
            </button>
          </form>
        </div>
      </div>
    </article>
  );
};

export default ProfilePage;