import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import InfoInput from "./pages/InfoInput";
import Upload from "./pages/Upload";
import Result from "./pages/Result";
import Home from "./pages/Home"
import "./styles/theme.css";

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/info" element={<InfoInput />} />  
                    <Route path="/result" element={<Result />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
