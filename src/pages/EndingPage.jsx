// src/pages/EndingPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {endings} from '../data/gameData';

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