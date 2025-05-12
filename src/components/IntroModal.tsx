import React from 'react';
import './IntroModal.css';

interface Props {
    onClose: () => void;
    }

    const IntroModal: React.FC<Props> = ({ onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>×</button>
            <div className="intro-header">
            {/* <img src="https://images.unsplash.com/photo-1600180758890-6ffb6b6cc4b4" alt="skinAi" /> */}
            <h2>당신의 피부, AI가 책임질게요.</h2>
            </div>
            <div className="intro-body">
            <p>
                <strong>skinAi</strong>는 인공지능을 활용하여 당신의 피부 상태를 분석하고,
                피부 타입에 맞는 화장품을 추천해주는 AI 기반 스마트 뷰티 서비스입니다.
            </p>
            <ul>
                <li>✅ 스마트 이미지 분석</li>
                <li>✅ 맞춤형 화장품 추천</li>
                <li>✅ 개인별 피부 개선 히스토리 기록 예정</li>
            </ul>
            </div>
        </div>
        </div>
    );
};

export default IntroModal;
