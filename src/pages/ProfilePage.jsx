// src/pages/ProfilePage.jsx (★★★★★ 擬似AI・完全版 ★★★★★)
import React, { useState } from 'react';

const ProfilePage = ({ onUnlockTruth }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // 入力中の演出用

  // --- 湊の「脳みそ（会話パターン）」 ---
  const talkPatterns = [
    // 1. 挨拶・自己紹介系
    { 
      keywords: ['こんにちは', 'こんばんは', 'はじめまして', 'やあ'], 
      replies: [
        '…こんにちは。',
        'こんな場所で挨拶なんて、奇妙ですね。',
        '…誰ですか？'
      ]
    },
    { 
      keywords: ['だれ', '誰', '名前', 'name'], 
      replies: [
        '私は湊。…それ以上は、まだ言えません。',
        'ただの記録です。あなたもすぐに忘れるでしょう…',
        '名前なんて、記号でしかありません。'
      ]
    },
    
    { 
      keywords: ['復讐', '殺す', '殺害', '犯人'], 
      replies: [
        '…その言葉は、使いたくありません。これは「裁き」です。',
        '彼らは、罪を償うべきでした。法が裁かないなら、私がやるしかない。',
        'もう、終わったことです。'
      ]
    },
    { 
      keywords: ['警察', '通報'], 
      replies: [
        '警察は…もう信用できません。私たちを見捨てた人たちです。',
        '通報？ …無駄ですよ。私はもう、どこにもいません。',
        '彼らに正義などありません。'
      ]
    },
    { 
      keywords: ['娘','妻','家族','月'], 
      replies: [
        '家族は…私の全てでした。',
        '二人の笑顔を奪った奴らを、私は許さない。',
        '…家族の話は、したくありません。'
      ]
    },

    {
      keywords: ['佐藤', 's', 'whale','xs4'],
      replies: [
        '…あいつは、最後まで何も思い出さなかった。',
        '下劣な男でした。目つき…思い出すだけで吐き気がします。'
      ]
    },
    {
      keywords: ['341', 'm', '782'],
      replies: [
        '隣に住んでいながら、見殺しにした男。',
        '「何も聞こえなかった」…？ よくそんな嘘が言えたものです。',
        'スマホに表示されているということは……'
      ]
    },
    {
      keywords: ['真実','o','最後'],
      replies: [
        '…思い出したくない',
        '奴だけは、絶対に許さない。',
        '全ての元凶。悪魔そのものです。'
      ]
    },

    // 4. 謎解きのヒント系
    { 
      keywords: ['ヒント', 'わからん', '難しい', '助けて', 'わからない', 'パスワード'], 
      replies: [
        '過去の記事をよく読んでください。',
        '記事の細部まで…目に見えているとは限りません。',
        '私は決して犯人を許さない…'
      ]
    },
    { 
      keywords: ['水族館', 'すいぞくかん', 'クラゲ', 'くらげ'], 
      replies: [
        '水族館…約束の場所。',
        '静かで、青くて…家族で最後に見るはずだった。',
        'あの子がみたいと言っていた生物…'
      ]
    },
    { 
      keywords: ['vrxnr'], 
      replies: [
        'あぁ…奴が持っていたメモにあった文字列ですね。冷静になって考えると、あの記号ははアルファベットを順に左へ三つずらせという意味か…'
      ]
    },
  ];

  // --- デフォルトの返事（当てはまらなかった時） ---
  const defaultReplies = [
    null
  ];

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatHistory(prev => [...prev, { type: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true); // 一旦「入力中...」にする

    const msg = userMessage.toLowerCase();

    // --- 1. 正解（倉庫）の判定 ---
    const correctKeywords = ['so-ko', 'souko', 'そうこ', '倉庫'];

    if (correctKeywords.includes(msg)) {
      setTimeout(() => {
        setIsTyping(false);
        setChatHistory(prev => [...prev, { type: 'admin', text: '...そこですか？ すぐに向かいます。ありがとう。' }]);
        
        setTimeout(() => {
          if (onUnlockTruth) {
            onUnlockTruth();
          }
        }, 2000);
      }, 1500);
      return;
    }

    // --- 2. 会話パターンの検索 ---
    let replyText = null; // 初期値は「なし」
    
    const matchedPattern = talkPatterns.find(pattern => 
      pattern.keywords.some(keyword => msg.includes(keyword))
    );

    if (matchedPattern) {
      // キーワードにヒットしたら返信を選ぶ
      const randomIndex = Math.floor(Math.random() * matchedPattern.replies.length);
      replyText = matchedPattern.replies[randomIndex];
    }

    // --- 3. 返信がある場合のみ実行 ---
    if (replyText) {
      const thinkingTime = Math.random() * 1000 + 1000; // 1秒〜2秒

      setTimeout(() => {
        setIsTyping(false);
        setChatHistory(prev => [...prev, { type: 'admin', text: replyText }]);
      }, thinkingTime);
    } else {
      // ★★★ 返信しない場合は、入力中表示をすぐに消す（既読スルー） ★★★
      setIsTyping(false);
    }
  };
  return (
    <article className="post">
      <h2 className="article-title">プロフィール詳細</h2>
      
      <div className="article-body">
        {/* ... (プロフィール情報の表示はそのまま) ... */}
        <h4>HN</h4>
        <p>湊 (Minato)</p>
        {/* ... */}
        <p style={{ fontSize: '0.9em', color: '#666' }}>
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
                whiteSpace: 'pre-wrap' // 改行を反映
              }}>
                {msg.text}
              </div>
            ))}
            {/* 入力中のアニメーション（簡易版） */}
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