import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import DataVerificationProcess from './pages/DataVerificationProcess';
import ScanFacePage from './pages/LivnessDetection'; 
import DataVerification from './pages/DocumentVerification';
import ScanCrad from './pages/ScanCard';
import VerificationCompleted from './pages/VerificationCompleted';
import Ending from './pages/Ending';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/process" element={<DataVerificationProcess/>} />
        <Route path="/scan" element={<ScanFacePage/>} />
        <Route path="/Document" element={<DataVerification/>} />
        <Route path="/scancard" element={<ScanCrad/>} />
        <Route path="/dataverficationcompleted" element={<VerificationCompleted/>} />
        <Route path="/ending" element={<Ending/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
