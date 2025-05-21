// src/components/RightPanel.tsx
import React from 'react';
import './RightPanel.css';
import LogoText from "./LogoText"

interface RightPanelProps {
  name: string;
  setName: (name: string) => void;
  ageRange: string;
  setAgeRange: (ageRange: string) => void;
  skinConcerns: string[];
  handleConcernChange: (concern: string) => void;
  gender: string | null;
  setGender: (gender: string) => void;
  handleStartAnalysis: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  name,
  setName,
  ageRange,
  setAgeRange,
  skinConcerns,
  handleConcernChange,
  gender,
  setGender,
  handleStartAnalysis,
}) => {

  // 로컬 스토리지에 사용자 정보를 저장하고 분석 시작
  const handleClick = () => {
    localStorage.setItem('userName', name);
    localStorage.setItem('ageRange', ageRange);
    localStorage.setItem('skinConcerns', JSON.stringify(skinConcerns));
    localStorage.setItem('gender', gender || '');
    handleStartAnalysis(); // 실제 분석 함수 호출
  };

  return (
    <div className="right-panel">
      <LogoText />

      {/* 이름 입력 */}
      <label className='biglabel' htmlFor="name">이름</label>
      <input
        type="text"
        id="name"
        placeholder="이름을 입력하세요"
        className="small-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* 나이대 선택 */}
      <label className='biglabel' htmlFor="ageRange">나이대 선택</label>
      <select
        id="ageRange"
        className="small-input"
        value={ageRange}
        onChange={(e) => setAgeRange(e.target.value)}
      >
        <option value="">선택하세요</option>
        <option value="10대">10대</option>
        <option value="20대">20대</option>
        <option value="30대">30대</option>
        <option value="40대">40대</option>
        <option value="50대">50대</option>
        <option value="60대 이상">60대 이상</option>
      </select>

      {/* 피부 고민 */}
      <label className='biglabel'>피부 고민 (최대 3개 선택)</label>
      <div className="checkbox-group">
        {['트러블', '피부톤', '각질/피부결', '민감성', '자외선 차단', '유기농'].map((item) => (
          <label
            key={item}
            className={`checkbox-item ${skinConcerns.includes(item) ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              value={item}
              checked={skinConcerns.includes(item)}
              onChange={() => handleConcernChange(item)}
              disabled={!skinConcerns.includes(item) && skinConcerns.length >= 3}
            />
            {item}
          </label>
        ))}
      </div>

      {/* 성별 선택 */}
      <label className='biglabel'>성별 선택</label>
      <div className="radio-group">
        {['남성', '여성'].map((g) => (
          <label
            key={g}
            className={`radio-item ${gender === g ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="gender"
              value={g}
              checked={gender === g}
              onChange={() => setGender(g)}
            />
            {g}
          </label>
        ))}
      </div>

      {/* 버튼 */}
      <button className="signin-btn" onClick={handleClick}>
        피부분석 시작하기 →
      </button>
    </div>
  );
};

export default RightPanel;
