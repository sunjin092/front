import React from 'react';
import Result from './Result'; // 이미 작성한 분석 결과 컴포넌트
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">skinAi에 오신 것을 환영합니다</h1>

            <p className="home-description">
                <strong>skinAi</strong>는 당신의 피부 상태를 기반으로 맞춤형 화장품을 추천해주는 AI 기반 피부 분석 플랫폼입니다.
                피부 사진을 업로드하면 인공지능이 모공 수, 피부 탄력도, 수분 함유량 등의 정보를 정밀하게 분석하여,
                해당 결과를 바탕으로 피부에 가장 적합한 화장품을 선별해드립니다.
                사용자는 복잡한 성분 분석 없이도, 피부에 꼭 맞는 스킨케어 제품을 간편하게 선택할 수 있습니다.
            </p>

            <h2 className="preview-title">예시 분석 결과 미리보기</h2>
            <Result />

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="scroll-to-top-button"
                aria-label="맨 위로 가기"
            >
                ↑
            </button>
        </div>
    );
};

export default Home;
