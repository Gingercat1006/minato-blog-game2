// src/pages/ProfilePage.jsx
import React, { useState } from 'react';

const ProfilePage = ({ onUnlockTruth }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatHistory(prev => [...prev, { type: 'user', text: userMessage }]);
    setChatInput('');

    // 入力されたメッセージを小文字にして、前後の空白を削除する（誤入力防止）
    const msg = userMessage.toLowerCase().trim();
    
    // 正解のキーワードリスト
    const correctKeywords = ['so-ko', 'souko', 'そうこ', '倉庫'];

    // リストの中に msg が含まれているかチェック
    if (correctKeywords.includes(msg)) {
      setTimeout(() => {
        setChatHistory(prev => [...prev, { type: 'admin', text: '...そこですか？ すぐに向かいます。ありがとう。' }]);
        if (onUnlockTruth) {
          onUnlockTruth();
        }
      }, 1000);
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
        <p>深煎りコーヒー、白黒映画、水。</p>
        <h4>SNSなど</h4>
        <p>やっていません。</p>
        <p style={{ fontSize: '0.9em', color: '#666' }}>
          記事への感想などがあれば、こちらへお願いします。<br/>
          ※全てに目を通しますが、いたずらや無関係な内容には返信いたしません。
        </p>

        {/* チャットエリア */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', marginTop: '10px', backgroundColor: '#f9f9f9' }}>
          <div style={{ height: '200px', overflowY: 'auto', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chatHistory.map((msg, index) => (
              <div key={index} style={{ 
                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.type === 'user' ? '#dcf8c6' : '#fff',
                padding: '8px 12px',
                borderRadius: '10px',
                maxWidth: '80%',
                fontSize: '14px',
                boxShadow: '0 1px 1px rgba(0,0,0,0.1)'
              }}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} style={{ display: 'flex', gap: '5px' }}>
            <input 
              type="text" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
              placeholder="メッセージを入力..." 
              style={{ flex: 1, padding: '8px' }}
            />
            <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>送信</button>
          </form>
        </div>
      </div>
    </article>
  );
};

export default ProfilePage;