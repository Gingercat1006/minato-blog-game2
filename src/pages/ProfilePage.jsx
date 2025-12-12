// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGameLogic.jsx';
import '../css/ProfilePage.css';

const ProfilePage = () => {
  const { triggerTimeSkip } = useGame();
  const navigate = useNavigate();

  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const talkPatterns = [
    { 
      keywords: [], 
      replies: []
    }
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatHistory(prev => [...prev, { type: 'user', text: userMessage }]);
    setChatInput('');
    
    const msg = userMessage.toLowerCase();

    // --- 1. 正解（倉庫）の判定 ---
    const correctKeywords = ['kasumiso-ko', 'kasumisouko', 'かすみそうこ', '霞倉庫', 'かんきんばしょはかすみそうこ。', '監禁場所は霞倉庫'];

    if (correctKeywords.some(keyword => msg.includes(keyword))) {
      // 1. 最初の入力開始
      setIsTyping(true); 

      // 1.5秒後に1通目を送信
      setTimeout(() => {
        setIsTyping(false);
        setChatHistory(prev => [...prev, { type: 'admin', text: 'もしかしてあのメモの答えですか？' }]);
        
        // 1通目を送ってから0.8秒待機（相手が読んでいる/次の入力を準備している演出）
        setTimeout(() => {
          setIsTyping(true); // 再び入力中...を表示

          // さらに1.5秒後に2通目を送信
          setTimeout(() => {
            setIsTyping(false);
            setChatHistory(prev => [...prev, { type: 'admin', text: 'すぐに向かいます。ありがとう。' }]);

            // 3秒後に画面遷移
            setTimeout(() => {
              triggerTimeSkip(navigate); 
            }, 3000);

          }, 2000); // 2通目の入力にかかる時間

        }, 1000); // 1通目と2通目の間の「間」

      }, 1500); // 1通目の入力にかかる時間
      return;
    }

    // --- 2. 会話パターンの検索 ---
    const matchedPattern = talkPatterns.find(pattern => 
      pattern.keywords.some(keyword => msg.includes(keyword))
    );

    if (matchedPattern) {
      setIsTyping(true);
      const randomIndex = Math.floor(Math.random() * matchedPattern.replies.length);
      const replyText = matchedPattern.replies[randomIndex];

      setTimeout(() => {
        setIsTyping(false);
        setChatHistory(prev => [...prev, { type: 'admin', text: replyText }]);
      }, 1500);
    } 
  };

  return (
    <article className="post">
      <h2 className="article-title">プロフィール詳細</h2>
      
      <div className="article-body">
        <h4>HN</h4>
        <p>湊 (Minato)</p>
        <h4>自己紹介</h4>
        <p>静かな場所が好きです。日々のことを綴ります。このブログは、私の“記録”です。</p>
        <h4>好きなもの</h4>
        <p>白いもの、水。</p>
        <h4>SNSなど</h4>
        <p>やっていません。</p>
        
        <p className="profile-note">
          記事への質問などがあれば、こちらへお願いします。<br/>
          ※全てに目を通しますが、いたずらや無関係な内容は返信しません。
        </p>

        {/* チャットエリア */}
        <div className="chat-container">
          <div className="chat-history">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`chat-message ${msg.type === 'user' ? 'user' : 'admin'}`}
              >
                {msg.text}
              </div>
            ))}
            
            {isTyping && (
              <div className="typing-indicator">
                湊が入力中...
              </div>
            )}
          </div>
          
          <form onSubmit={handleChatSubmit} className="chat-form">
            <input 
              type="text" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
              placeholder="メッセージを入力..." 
              className="chat-input"
            />
            <button 
              type="submit" 
              className="chat-submit-button"
              disabled={isTyping}
            >
              送信
            </button>
          </form>
        </div>
      </div>
    </article>
  );
};

export default ProfilePage;