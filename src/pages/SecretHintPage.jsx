// src/pages/SecretHintPage.jsx (新規作成)
import React, { useState } from 'react'; // ← useStateという、魔法の道具を、インポートします
import '../css/SecretHintPage.css'; // ← 序章の、美しいデザインを、再利用します

const hints = [
    {
      id: 1,
      title: '忘れられた事件',
      a: 'ひとつ前の「あの日のこと」に書かれているよ。',
    },
    {
      id: 2,
      title: '最初の場所',
      a: 'タイトル「月」のブログ内にある画像をよく見てみよう。',
    },
    {
      id: 3,
      title: '一人目',
      a: '手元をよくみてとはキーボードのことを指しているよ。',
    },
    {
      id: 4,
      title: '二人目',
      a: 'Mの名前はひとつ前の記事のスマホに書かれているメモを解く必要があるよ。普段スマホでどんな入力の仕方をしているかな？スマホ、タブレット特有の方法だよ。',
    },
    {
      id: 5,
      title: '二人目の男',
      a: 'Mの部屋番号はどこにも書いていないけれど「あの日のこと」の中に考えられる要素があるよ。',
    },
    {
      id: 6,
      title: '最後の男',
      a: '実はそのままじゃ読めない文字が書かれているよ。工夫して探してみて。「色」の所を読んでみてもいいかもね。',
    },
    {
      id: 7,
      title: '復讐の終わり',
      a: '娘からもらった絵をよく見てみよう。',
    },
    {
      id: 8,
      title: '最後の記録',
      a: '実はずっと目に入る所にいたよ。でも「復讐の終わり」で出てきたメモは何だったのだろう…',
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
  
          <h1>ヒント</h1>
  
          <div style={{ textAlign: 'left' }}>
            {hints.map(hint => (
              <div key={hint.id}>
  
                {/* 問い */}
<div
  className={`hint-question ${open[hint.id] ? 'open' : ''}`}
  onClick={() => toggle(hint.id)}
>
  <h2>{hint.title}</h2>
  <span className="click-indicator">
    （クリックでヒントを表示）
  </span>
</div>
                {/* 答え */}
                {open[hint.id] && (
                  <div className="hint-answer">
                    <h2>【追加ヒント】</h2>
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