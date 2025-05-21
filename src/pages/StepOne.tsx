

import React from 'react';
import ImageUploader from '../components/ImageUploader';
import './StepOne.css';
import sampleImage from "../assets/face_sample.png"


const StepOne: React.FC = () => {
    return (
        <div className='StepOneContainer'>
            <h2>
                피부 이미지 업로드
            </h2>

            <div className='guide'>
                <h4>높은 정확도를 위해 다음 가이드 라인을 따라주시기 바랍니다</h4>
                <p>1. 세안 후 촬영한 정면의 이미지를 사용하시기 바랍니다.</p>
                <p>2. 그림자가 없이 밝은 곳에서 사진을 찍어주시기 바랍니다.</p>
                <p>3. 필터 혹은 왜곡이 없는 사진을 사용하시기 바랍니다.</p> 
                {/* <p>4. 정사각형 이미지를 사용하시기 바랍니다.</p> */}
                
                    <img src={sampleImage} alt="샘플 이미지" style={{ width: '250px', display: 'block',margin: '50px auto 0'  }} />
                
            </div>
        

        <ImageUploader />
        </div>
    );
};

export default StepOne;
