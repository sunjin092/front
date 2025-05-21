// src/components/LeftPanel.tsx
import React from 'react';
import './LeftPanel.css';
import illustration from '../assets/illust.png';

interface LeftPanelProps {
  typedText: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ typedText }) => {
  return (
      <div className="left-panel">
        <img src={illustration} alt="Illustration" className="illustration" />
        <div className="overlay-text">
          <h1>AI 기반 맞춤형 피부 분석 & 화장품 추천 시스템</h1>
          <br />
          <span>{typedText}</span>
        </div>
      </div>

  );
};

export default LeftPanel;
