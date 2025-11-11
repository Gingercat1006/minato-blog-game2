// src/components/PasswordPrompt.jsx (★★★★★ これが、最後の、最終完成版です ★★★★★)
import React, {useState} from 'react';
// ClickableHintはもう不要なので、インポートしません

// パスワードをBase64形式で難読化しておく
// src/components/PasswordPrompt.jsx の中
// ★★★ 復讐劇バージョンの、新しいパスワードリスト ★★★
const encodedPasswords = {
  '6': 'a2FzdW1pY2hvdQ==',    // kasumichou
  '7': 'aXpha2F5YV90c3VraQ==',    // izakaya_tsuki
  '8': 'cw==',                // s
  '9': 'MjAx',                // 201
  '10': 'dA==',               // t
  '11': 'YW9p',               // aoi (青い)
  '12': 'MTEwNw==',           // 1107
  '13': 'a3VyYWdl',            // kurage (クラゲ)
};

const PasswordPrompt = ({ articleId, hint, onCorrectPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const encodedInput = btoa(password.toLowerCase());
      if (encodedPasswords[articleId] && encodedInput === encodedPasswords[articleId]) {
        onCorrectPassword(articleId);
      } else {
        setError('パスワードが違います。');
      }
    } catch (err) {
      console.error("Password encoding error:", err);
      setError('パスワードの形式が正しくありません。');
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
          autoComplete="new-password"
        />
        <button type="submit">解除</button>
      </form>
      {error && <p className="error">{error}</p>}
      
      {/* ★★★ ここが、最後の修正です ★★★ */}
      {/* ClickableHintをやめて、常にヒントを直接表示するように変更します */}
      <div className="hint-box" style={{ marginTop: '20px' }}>
        <strong>パスワード:</strong> {hint}
      </div>
    </div>
  );
};

export default PasswordPrompt;