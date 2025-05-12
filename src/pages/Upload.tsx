import React from 'react';
import ImageUploader from '../components/ImageUploader';

const Upload: React.FC = () => {
    return (
        <div>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#D9A5B3' }}>
            피부 이미지 업로드
        </h2>
        <p>높은 정확도를 위해 세안 후 이미지를 업로드하시기 바랍니다.</p>
        <p>또한 그림자가 없이 밝은 곳에서 사진을 찍어야 높은 정확도를 가지게 됩니다.</p>
        <ImageUploader />
        </div>
    );
};

export default Upload;
