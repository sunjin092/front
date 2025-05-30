import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalysisResult from '../components/AnalysisResult';
import './StepTwo.css';

interface ZScoreAvg {
  '색소침착': number;
  '수분': number;
  '탄력': number;
  '모공': number;
}

interface PriorityConcern extends Array<string | number> {}

const Result: React.FC = () => {
  const [zScoreAvg, setZScoreAvg] = useState<ZScoreAvg | null>(null);
  const [priorityConcern, setPriorityConcern] = useState<PriorityConcern | null>(null);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
  const storedResult = localStorage.getItem('analysisResult');
  if (storedResult) {
    try {
      const parsed = JSON.parse(storedResult);

      console.log('✅ 백엔드 분석 결과 전체:', parsed);  // ← 여기 추가

      setZScoreAvg(parsed.analysis.z_score_avg);
      setPriorityConcern(parsed.analysis.priority_concern);
    } catch (err) {
      console.error('분석 결과 파싱 실패:', err);
      alert('분석 데이터를 불러오지 못했습니다.');
      navigate('/');
    }
  } else {
    alert('분석 결과가 없습니다. 처음부터 다시 진행해주세요.');
    navigate('/');
  }

  const storedName = localStorage.getItem('userName');
  if (storedName) setName(storedName);

  const storedAge = localStorage.getItem('ageRange');
  if (storedAge) setAge(storedAge);
}, []);

  const handleNextClick = () => {
    navigate('/stepthree');
  };

  if (!zScoreAvg) return <div>분석 결과를 불러오는 중입니다...</div>;

  return (
    <div className="StepTwoContainer">
      <h2 className="user-name">{name}님의 피부 결과 분석</h2>

      <div className="priority-concern">
        <h3>우선 관리가 필요한 영역은 </h3>
        {priorityConcern && (
          <h3>
            <span className="gradient-text">{priorityConcern[1]}</span> 의{' '}
            <span className="gradient-text">{priorityConcern[0]}</span> 영역입니다.
          </h3>
        )}
      </div>

      <AnalysisResult graphData={zScoreAvg} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '500px',
          marginTop: '-40px',
          marginBottom: '80px',
          marginLeft: '80px',
          fontWeight: 'bold',
        }}
      >
        <div>bad</div>
        <div>{age} 평균</div>
        <div>good</div>
      </div>

      <button className="next-button" onClick={handleNextClick}>
        나에게 맞는 화장품 추천받기
      </button>
    </div>
  );
};

export default Result;
