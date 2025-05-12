import React from 'react';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#F28C8C' }}>로그인</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
