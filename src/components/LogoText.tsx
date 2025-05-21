// src/components/Logo.tsx
import React from 'react';
import logo from '../assets/logo.png'; // logo.png 경로가 맞는지 꼭 확인!

const LogoText: React.FC = () => {
  return (
    <div className="logo-wrapper">
      <img src={logo} alt="skinAi 로고" className="logo-img" />
      <h1 className="logo-title">
        <span style={{ color: 'white' }}>S</span>
        <span style={{ color: '#333' }}>kin-Ai</span>
      </h1>
    </div>
  );
};

export default LogoText;
