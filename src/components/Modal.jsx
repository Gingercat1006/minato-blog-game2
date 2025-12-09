import React from 'react';

const Modal = ({ imageSrc, onClose }) => {
  // 画像がない場合は何も表示しない
  if (!imageSrc) return null;

  // 画像自体をクリックしても閉じないようにする
  const handleImageClick = (e) => {
    e.stopPropagation();
  };

  return (
    // 背景をクリックすると閉じる
    <div className="lightbox-overlay" onClick={onClose}>
      <img 
        src={imageSrc} 
        alt="拡大画像" 
        className="lightbox-image" 
        onClick={handleImageClick} 
      />
    </div>
  );
};

export default Modal;