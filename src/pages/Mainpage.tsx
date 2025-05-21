import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mainpage.css';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [skinConcerns, setSkinConcerns] = useState<string[]>([]);
  const [gender, setGender] = useState<string | null>(null);
  const [typedText, setTypedText] = useState('');
  const [name, setName] = useState('');
  const [ageRange, setAgeRange] = useState(''); // 추가
  const [startAnimation, setStartAnimation] = useState(false);

  const handleStartAnalysis = () => {
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    setStartAnimation(true);
  };

const fullText = `개인의 피부 이미지를 분석하여, 피부 타입과 고민에 최적화된 화장품을 추천합니다.
화장품 기능, 사용자 고민을 통합해 더 정확하고 신뢰도 높은 추천 결과를 제공합니다.
전문가가 아니어도 누구나 손쉽게 정밀한 피부 진단과 효과적인 스킨케어 제품 선택이 가능합니다.`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText((prev) => prev + fullText[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (startAnimation) {
      const timer = setTimeout(() => {
        navigate('/stepone');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [startAnimation, navigate]);

  const handleConcernChange = (concern: string) => {
    setSkinConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : prev.length < 3
        ? [...prev, concern]
        : prev
    );
  };

  return (
    <div className={`main-container ${startAnimation ? 'animate-transition' : ''}`}>
      <div className={`white-box ${startAnimation ? 'animate-transition' : ''}`}>
        <LeftPanel typedText={typedText} />
        <RightPanel
          name={name}
          setName={setName}
          ageRange={ageRange}          // 추가
          setAgeRange={setAgeRange}    // 추가
          skinConcerns={skinConcerns}
          handleConcernChange={handleConcernChange}
          gender={gender}
          setGender={setGender}
          handleStartAnalysis={handleStartAnalysis}
        />
      </div>
    </div>
  );
};

export default MainPage;
