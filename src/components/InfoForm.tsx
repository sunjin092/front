import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
        // 실제 로그인 로직 (예: 서버 인증)은 여기에
        alert('로그인 성공!');
        navigate('/info'); // 로그인 성공 후 정보 입력 페이지로 이동
    } else {
        alert('이메일과 비밀번호를 입력해주세요.');
    }
};


    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input
            id="email"
            type="email"
            value={email}
            placeholder="example@domain.com"
            onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">비밀번호</label>
        <input
            id="password"
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">로그인</button>
        </form>
    );
};

export default LoginForm;
