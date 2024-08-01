import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DataVerificationProcess from './pages/DataVerificationProcess';
import ScanFacePage from './pages/LivnessDetection';
import DataVerification from './pages/DocumentVerification';
import ScanCard from './pages/ScanCard'; // Corrected typo: ScanCrad -> ScanCard
import VerificationCompleted from './pages/VerificationCompleted';
import TakeSelfie from './pages/TakeSelfie';
import Dashboard from './pages/Dashboard';
import Ending from './pages/Ending';
import ProtectedRoute from './pages/ProtectedRoute'; // Import <ProtectedRoute></ProtectedRoute
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
           <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Document"
          element={
            <ProtectedRoute>
              <DataVerification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/process"
          element={
            <ProtectedRoute>
              <DataVerificationProcess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <ScanFacePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/selfie"
          element={
            <ProtectedRoute>
              <TakeSelfie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scancard"
          element={
            <ProtectedRoute>
              <ScanCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dataverficationcompleted"
          element={
            <ProtectedRoute>
              <VerificationCompleted />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ending"
          element={
            <ProtectedRoute>
              <Ending />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
