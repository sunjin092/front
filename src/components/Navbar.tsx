import React from 'react';
import './Navbar.css';

interface NavbarProps {
  currentStep: number;
  totalSteps?: number;
  onBack: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentStep , totalSteps = 4, onBack }) => {
  return (
    <div className="step-navbar">
      <button className="back-button" onClick={onBack}>&lt;</button>
      <div className="step-container">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index+ 1}
            className={`step-block ${index < currentStep+1 ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
