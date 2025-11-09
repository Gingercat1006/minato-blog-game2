// frontend/src/components/ClickableHint.jsx
import React, { useState } from 'react';

const ClickableHint = ({ hintText }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="hint-button">
        ヒントを見る
      </button>
    );
  }

  return (
    <div className="hint-box">
      <strong>ヒント:</strong> {hintText}
    </div>
  );
};

export default ClickableHint;