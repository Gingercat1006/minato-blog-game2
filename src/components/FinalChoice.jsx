// src/components/FinalChoice.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FinalChoice = ({ isVisible }) => {
  const navigate = useNavigate();
  const [showReportPrompt, setShowReportPrompt] = useState(false);
  const [locationInput, setLocationInput] = useState('');

  const handleChoice = (choice) => {
    if (choice === 'report') {
      setShowReportPrompt(true);
    } else {
      navigate('/ending/2'); // 「見過ごす」が押されたら、エンディング2へ
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    // プレイヤーが入力しうる、全ての「正解」を、ここに、優しく、用意します
    const validAnswers = ['水族館','すいぞくかん','suizokukan','suizokukann'];
    
    // プレイヤーの答えが、この、優しいリストの中に、含まれているか？
    if (validAnswers.includes(locationInput)) {
      navigate('/ending/1'); // 含まれていれば, エンディング1-Aへ
    } else {
      navigate('/ending/3'); // 含まれていなければ, エンディング1-Bへ
    }
  };

  // もし、出番でなければ、静かに、待機する
  if (!isVisible) {
    return null;
  }

  return (
    <div className={'final-choice active'}>
      {!showReportPrompt ? (
        <div>
          <h3>あなたはどうしますか？</h3>
          <button onClick={() => handleChoice('report')}>警察に通報する</button>
          <button onClick={() => handleChoice('overlook')}>……見過ごす</button>
        </div>
      ) : (
        <div>
          <h3>湊の居場所を、伝えてください。</h3>
          <form onSubmit={handleReportSubmit}>
            <input type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} autoFocus placeholder="場所を入力" style={{ padding: '8px' }} />
            <button type="submit" style={{ marginLeft: '10px', padding: '8px' }}>通報する</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FinalChoice;