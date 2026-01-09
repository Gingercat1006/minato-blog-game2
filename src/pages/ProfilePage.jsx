// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGameLogic.jsx';
import '../css/ProfilePage.css';

const encodeJapanese = (str) => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    let binary = '';
    for (let i = 0; i < data.length; i++) {
      binary += String.fromCharCode(data[i]);
    }
    return btoa(binary);
  } catch (e) {
    console.error("Encoding failed", e);
    return null;
  }
};

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
    },
  ];
  const encodedCorrectKeywords = [
    'a2FzdW1pc28ta28=',
    'a2FzdW1pc291a28=',
    '44GL44GZ44G/44Gd44GG44GT',
    '6Zye5YCJ5bqr',
    '44GL44KT44GN44G+44GZ44KI44GL44GZ44G/44Gd44GG44GT44CC',
    '55uY56a65aC05omA44Gv6Z2e5LuN5b2N'
  ];
  
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatHistory(prev => [...prev, { type: 'user', text: userMessage }]);
    setChatInput('');
    
    // ユーザーの入力も、難読化
    const encodedMsg = encodeJapanese(userMessage.toLowerCase());

    if (encodedCorrectKeywords.includes(encodedMsg)) {
      // --- 1. 正解の、演出 ---
      setIsTyping(true); 
      setTimeout(() => {
        setIsTyping(false);
        setChatHistory(prev => [...prev, { type: 'admin', text: '...もしかしてあのメモの答えですか？' }]);
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setChatHistory(prev => [...prev, { type: 'admin', text: 'すぐに向かいます。ありがとう。' }]);
            setTimeout(() => {
              triggerTimeSkip(navigate); 
            }, 3000);
          }, 2000);
        }, 1000);
      }, 1500);
      return;
    }

    // --- 2. 不正解の場合の、通常の会話パターン ---
    const msg = userMessage.toLowerCase();
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