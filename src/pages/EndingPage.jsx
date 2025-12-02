// src/pages/EndingPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

// ★★★ ここが、最後の、そして、最も重要な、修正です ★★★
// ★★★ 3つの、全ての結末が、ここに、記録されます ★★★
const endings = {
  '1': {
    title: 'ENDING 1-A: あなたは、彼女を止めた',
    text: 'あなたは、震える手で、警察に「水族館です」と伝えた。\n数時間後、ニュース速報が流れる。\n「連続殺人事件の重要参考人とみられる人物の身柄を、××水族館で、駆けつけた警察官が保護した、との情報が入りました…」\nあなたは、一人の復讐者を裁くことができた。'
  },
  '2': {
    title: 'ENDING 2: あなたは、見逃した',
    text: 'あなたは、見過ごすことを選んだ。\nブログが更新されることは、もう二度となかった。\n湊が、どうなったのか、知る者は誰もいない。\nただ、あなたの心の中にだけ、一人の復讐者の、最後の記録が、静かに残り続ける。\nあなたは、彼女の、最後の共犯者になった。'
  },
  '3': {
    title: 'ENDING 1-B: あなたの言葉は、届かなかった',
    text: 'あなたの言葉は、届かなかった。\n警察は、あなたの曖昧な通報を、いたずらだと判断したのかもしれない。\n翌日、ニュースは、××水族館で発見された、身元不明の女性のニュースを、小さく報じた。\nあなたは、彼女を、止めることができなかった。'
  }
};

const EndingPage = () => {
  const { endingId } = useParams();
  const ending = endings[endingId];

  return (
    <div className="ending-container">
      {ending ? (
        <div className="ending-content">
          <h2>{ending.title}</h2>
          <p>{ending.text}</p>
          <Link to="/gameclear">物語の終わりへ</Link>
        </div>
      ) : (
        <p>エンディングが見つかりません。</p>
      )}
    </div>
  );
};

export default EndingPage;