// src/components/PasswordPrompt.jsx (★★★★★ 究極の最終形態 ★★★★★)
import React, { useState } from 'react';

// 全ての正解パスワード（通常＋揺らぎ許容）を、難読化して、ここに、ただ一つ、集約する
const encodedAnswers = {
  '6': [
    'a2FzdW1pY2hvdQ==', // "kasumichou"
    'a2FzdW1pdHlvdQ==', // "kasumityou"
    'a2FzdW1pY3lvdQ==', // "kasumicyou"
  ],
  '7': ['d2hhbGU='],           //"whale"
  '8': ['c2F0b3U='],               // "satou"
  '9': ['bWl5YWtl'],               // "miyake"
  '10': ['MjAx'],              // "201"
  '11': ['YW9p'],              // "aoi"
  '12': ['MTEwNw=='],          // "1107"
  '13': ['a3VyYWdl'],           // "kurage"
};

const PasswordPrompt = ({ articleId, hint, onCorrectPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInput = password.toLowerCase();

    try {
      const encodedInput = btoa(userInput);

      // ★★★ 浄化された、ただ一つの、完璧なチェックロジック ★★★
      if (encodedAnswers[articleId] && encodedAnswers[articleId].includes(encodedInput)) {
        onCorrectPassword(articleId);
      } else {
        setError('パスワードが違います。');
      }

    } catch (err) {
      // ★★★ 全角文字など、予期せぬ入力から、ゲームを守る、最強の防護壁 ★★★
      console.error("Password encoding error:", err);
      setError('パスワードの形式が正しくありません。半角英数字で入力してください。');
    }
  };

  return (
    <div className="password-prompt">
      <p>この記事はパスワードで保護されています。</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder="パスワードを入力"
          autoComplete="off"
        />
        <button type="submit">解除</button>
      </form>
      {error && <p className="error">{error}</p>}
      
      <div className="hint-box" style={{ marginTop: '20px' }}>
        <strong>ヒント:</strong> {hint}
      </div>
    </div>
  );
};

export default PasswordPrompt;