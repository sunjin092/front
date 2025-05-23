import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState<number>(0);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
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

      // ✅ 이름과 나이대 localStorage에 저장 (Result 페이지에서 사용)
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

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('gender', gender === '여성' ? '여' : '남');
    formData.append('age_group', `${age}대`);
    selectedConcerns.forEach((item) => {
      formData.append('concerns', item);
    });

    console.log('폼 전송 내용:', {
      gender: gender === '여성' ? '여' : '남',
      age,
      concerns: selectedConcerns,
      file: selectedFile.name
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/analyze-recommend`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const data = await response.json();

      // ✅ 콘솔에 백엔드 응답 전체 출력
      console.log('✅ 백엔드에서 받은 응답 데이터:', data);

      // ✅ 분석 결과 저장
      localStorage.setItem('analysisResult', JSON.stringify(data));

      navigate('/steptwo');
    } catch (error) {
      alert('이미지 분석에 실패했습니다.');
      console.error('❌ 분석 요청 실패:', error);
    }
  };

  return (
    <div className='ImageUpload-box'>
      <p>피부 이미지 업로드</p>
      <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />

      <button type="button" onClick={handleUpload}>
        분석 요청
      </button>
    </div>
  );
};

export default ImageUploader;
