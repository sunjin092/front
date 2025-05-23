import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ImageUploader.css'; // ✅ 추가한 CSS 연결

const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState<number>(0);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state as {
      gender?: string;
      age?: number;
      concerns?: string[];
      name?: string;
    };

    if (state?.gender && state?.age) {
      setGender(state.gender);
      setAge(state.age);
      if (state.concerns?.length) {
        setSelectedConcerns(state.concerns);
      }

      localStorage.setItem('userName', state.name || '사용자');
      localStorage.setItem('ageRange', `${state.age}대`);
    } else {
      alert('입력 정보가 누락되어 첫 페이지로 이동합니다.');
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !gender || !age) {
      alert('이미지, 성별, 나이 정보를 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('gender', gender === '여성' ? '여' : '남');
    formData.append('age_group', `${age}대`);
    selectedConcerns.forEach((item) => {
      formData.append('concerns', item);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/analyze-recommend`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('서버 응답 오류');

      const data = await response.json();
      console.log('✅ 백엔드에서 받은 응답 데이터:', data);

      localStorage.setItem('analysisResult', JSON.stringify(data));
      navigate('/steptwo');
    } catch (error) {
      alert('이미지 분석에 실패했습니다.');
      console.error('❌ 분석 요청 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='ImageUpload-box'>
      <p>피부 이미지 업로드</p>
      <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />

      <button type="button" onClick={handleUpload} disabled={isLoading}>
        {isLoading ? '분석 중...' : '분석 요청'}
      </button>

      {isLoading && (
        <div className="spinner-box">
          <div className="spinner" />
          <p>분석 중입니다. 잠시만 기다려주세요...</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
