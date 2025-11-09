// frontend/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header">
      <h1><Link to="/">Minato's Room</Link></h1>
      <p>静かな場所が好きです。日々のことを綴ります。</p>
      <div className="header-image"></div>
    </header>
  );
};

export default Header;