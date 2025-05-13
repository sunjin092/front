import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUploader: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('이미지를 선택해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);  // ✅ FastAPI 쪽에서 요구하는 key 이름

        try {
            const response = await fetch('https://capstone1-backend-deploy.up.railway.app/analyze-recommend', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`서버 오류: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem('analysisResult', JSON.stringify(data));
            navigate('/result');
        } catch (error) {
            alert('이미지 분석 요청에 실패했습니다.');
            console.error('❌ 오류 내용:', error);
        }
    };

    return (
        <div>
            <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
            <button type="button" onClick={handleUpload}>
                분석 요청
            </button>
        </div>
    );
};

export default ImageUploader;
