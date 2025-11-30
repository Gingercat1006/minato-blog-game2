// src/pages/IntroPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './IntroPage.css';

const IntroPage = () => {
  return (
    <div className="intro-container">
      <div className="intro-box">
        <h1>あなたが見つけた、一つの記録</h1>
        <p>
          ネットの海を、あてもなく漂っていた、ある夜。<br />
          あなたは、偶然、一つの個人ブログにたどり着く。<br /><br />

          「Minato's Room」<br /><br />

          何気ない日常が綴られた、静かな場所。<br />
          しかし、その記録の片隅に、あなたは、小さな棘のような「違和感」を見つけてしまう。<br /><br />

          このブログに投稿された、全ての記録を閲覧し、その奥に隠された<strong>「真実」</strong>を突き止めること。<br />
          それが、このゲームの目的です。
        </p>
        {/* aタグを、React RouterのLinkコンポーネントに、進化させます */}
        <Link to="/home" className="button">湊の個人ブログへ</Link>
      </div>
    </div>
  );
};

export default IntroPage;