import React from 'react';

const NotificationModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="notification-overlay" onClick={onClose}>
      <div className="notification-box" onClick={(e) => e.stopPropagation()}>
        <p className="notification-text">{message}</p>
        <button className="notification-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;