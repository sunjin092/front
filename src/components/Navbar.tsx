import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from "../assets/logo.png"
import IntroModal from './IntroModal'; // 추가

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">
                <img src={logo} alt="skinAi 로고" className="logo-img" />
                    skinAi
                </Link>
            </div>
            <div className="navbar-right">
                <button className="nav-button" onClick={() => navigate('/login')}>
                    로그인
                </button>
                <button className="intro-button" onClick={() => setShowModal(true)}>
                    소개
                </button>
            </div>
        </nav>
        {showModal && <IntroModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default Navbar;
