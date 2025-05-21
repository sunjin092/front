import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Mainpage from "./pages/Mainpage";
import StepOne from "./pages/StepOne";
import StepTwo from "./pages/StepTwo";
import StepThree from "./pages/StepThree";
import Navbar from "./components/Navbar";

import "./styles/theme.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // 현재 경로에서 단계 숫자 추출 (예: /stepone → 1)
  const path = location.pathname.toLowerCase();

  const stepMap: Record<string, number> = {
    "/stepone": 1,
    "/steptwo": 2,
    "/stepthree": 3,
  };

  const currentStep = stepMap[path];
  const showNavbar = !!currentStep; // 1, 2, 3이면 true

  return (
    <>
      
    <div className="container">
            {showNavbar && (

                <Navbar
                    currentStep={currentStep}
                    onBack={() => navigate(-1)} // 뒤로가기
                />

        
      )}
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/stepone" element={<StepOne />} />
          <Route path="/steptwo" element={<StepTwo />} />
          <Route path="/stepthree" element={<StepThree />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
