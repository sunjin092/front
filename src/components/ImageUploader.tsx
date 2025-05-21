import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleConcernChange = (value: string) => {
    if (selectedConcerns.includes(value)) {
      setSelectedConcerns(selectedConcerns.filter(c => c !== value));
    } else if (selectedConcerns.length < 3) {
      setSelectedConcerns([...selectedConcerns, value]);
    } else {
      alert('고민은 최대 3개까지 선택 가능합니다.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !gender || !age) {
      alert('이미지, 성별, 나이를 모두 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('gender', gender);
    formData.append('age', age.toString());
    formData.append('concerns', JSON.stringify(selectedConcerns));

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
      <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />

      <div>
        <label>성별:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">선택</option>
          <option value="여">여</option>
          <option value="남">남</option>
        </select>
      </div>

      <div>
        <label>나이:</label>
        <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
      </div>

      <div>
        <label>고민 선택 (최대 3개):</label><br />
        {['트러블', '민감성', '피부톤', '각질/피부결', '자외선 차단', '유기농'].map((concern) => (
          <label key={concern}>
            <input
              type="checkbox"
              checked={selectedConcerns.includes(concern)}
              onChange={() => handleConcernChange(concern)}
            />
            {concern}
          </label>
        ))}
      </div>

      <button type="button" onClick={handleUpload}>
        분석 요청
      </button>
    </div>
  );
};

export default ImageUploader;
