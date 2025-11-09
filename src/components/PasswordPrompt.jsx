// frontend/src/components/PasswordPrompt.jsx (★★★★★ 最終完成版 ★★★★★)
import React, { useState } from 'react';
import ClickableHint from './ClickableHint';

// パスワードをBase64形式で難読化しておく
// これで、ファイルを見られても "kasumichou" という文字列は直接見えなくなる
const encodedPasswords = {
  '6': 'a2FzdW1pY2hvdQ==', // "kasumichou"
  '7': 'YXF1YQ==',         // "aqua"
  '8': 'MTEwNw=='          // "1107"
};

const PasswordPrompt = ({ articleId, hint, onCorrectPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // ユーザーが入力したパスワードを、同じBase64形式に変換
      const encodedInput = btoa(password.toLowerCase());
      
      // 変換したもの同士を比較する
      if (encodedPasswords[articleId] && encodedInput === encodedPasswords[articleId]) {
        onCorrectPassword(articleId); // 正解なら親に通知
      } else {
        setError('パスワードが違います。'); // 不正解ならエラー表示
      }
    } catch (err) {
      // btoaでエラーが起きる可能性もあるため、念のためキャッチ
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
      
      {/* ヒント表示コンポーネント */}
      <div className="hint-container">
        <ClickableHint hintText={hint} />
      </div>
    </div>
  );
};

export default PasswordPrompt;