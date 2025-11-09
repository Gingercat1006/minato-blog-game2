import React from 'react';
import { useParams, Link } from 'react-router-dom';

const endings = {
  '1': { title: 'END 1: 計画は未然に防がれた', text: '【翌日のニュース】\n\n「昨日夜、××公園で男性を刃物で襲おうとした人物が、通報により駆けつけた警察官によって傷害未遂の現行犯で逮捕されました。逮捕された人物は黙秘を続けており、警察は動機について慎重に捜査を進めています…」' },
  '2': { title: 'END 2: 悲劇は繰り返された', text: '【翌日のニュース】\n\n「昨日未明、××公園で男性が胸などを刺され死亡しているのが発見されました。警察は何者かが男性を殺害したとみて、殺人事件として捜査を開始しました。現場からは凶器などは見つかっておらず…」' },
};

const EndingPage = () => {
  const { endingId } = useParams();
  const ending = endings[endingId];

  return (
    <div style={{ height: '100vh', background: 'black', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {ending ? (
        <div style={{ maxWidth: '600px', textAlign: 'center' }}>
          <h2>{ending.title}</h2>
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{ending.text}</p>
          <Link to="/" style={{ color: '#4a90e2', marginTop: '30px', display: 'inline-block' }}>ブログのトップに戻る</Link>
        </div>
      ) : (
        <p>エンディングが見つかりません。</p>
      )}
    </div>
  );
};

export default EndingPage;