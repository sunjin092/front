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
  };

  if (state?.gender && state?.age) {
    setGender(state.gender);
    setAge(state.age); // 여기서 그냥 숫자로 바로 사용
    setSelectedConcerns(state.concerns ?? []);
  } else {
    alert('입력 정보가 누락되어 첫 페이지로 이동합니다.');
    navigate('/');
  }
}, [location.state]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !gender || !age) {
      alert('이미지, 성별, 나이 정보가 누락되었습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('gender', gender);
    formData.append('age', age.toString());
    formData.append('concerns', JSON.stringify(selectedConcerns));

    console.log('폼 전송 내용:', {
      gender,
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
      localStorage.setItem('analysisResult', JSON.stringify(data));
      navigate('/result');
    } catch (error) {
      alert('이미지 분석에 실패했습니다.');
      console.error(error);
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