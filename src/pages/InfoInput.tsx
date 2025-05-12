import React, { useState } from 'react';
import './InfoInput.css';

const InfoInput: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    ageRange: '',
    skinConcerns: [] as string[],
    sensitiveIngredients: '',
  });

  const skinConcernOptions = ['여드름', '주름', '모공', '탄력 부족', '홍조'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkinConcernChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newConcerns = checked
      ? [...formData.skinConcerns, value]
      : formData.skinConcerns.filter((concern) => concern !== value);
    setFormData({ ...formData, skinConcerns: newConcerns });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('입력된 정보:', formData);
    // 여기에 서버 전송 또는 다음 단계 로직 추가
  };

  return (
    <div className="infoinput-container">
      <h2 className="infoinput-title">기본 정보 입력</h2>
      <form onSubmit={handleSubmit} className="infoinput-form">
        <label>
          이름:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          성별:
          <select name="gender" value={formData.gender} onChange={handleInputChange} required>
            <option value="">선택</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </select>
        </label>

        <label>
          나이대:
          <select name="ageRange" value={formData.ageRange} onChange={handleInputChange} required>
            <option value="">선택</option>
            <option value="10">10대</option>
            <option value="20">20대</option>
            <option value="30">30대</option>
            <option value="40+">40대 이상</option>
          </select>
        </label>

        <fieldset>
          <legend>피부 고민 (복수 선택 가능):</legend>
          {skinConcernOptions.map((concern) => (
            <label key={concern}>
              <input
                type="checkbox"
                value={concern}
                checked={formData.skinConcerns.includes(concern)}
                onChange={handleSkinConcernChange}
              />
              {concern}
            </label>
          ))}
        </fieldset>

        <label>
          알레르기 또는 민감 성분:
          <input
            type="text"
            name="sensitiveIngredients"
            value={formData.sensitiveIngredients}
            onChange={handleInputChange}
            placeholder="예: 알코올, 향료 등"
          />
        </label>

        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default InfoInput;
