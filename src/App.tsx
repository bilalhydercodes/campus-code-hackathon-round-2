import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { IconContext } from 'phosphor-react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import DigitalIdPage from './pages/DigitalIdPage';
import CertificatesPage from './pages/CertificatesPage';
import StudentGuidePage from './pages/StudentGuidePage';

export default function App() {
  return (
    <IconContext.Provider value={{ size: 25 }}>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/student" element={<StudentDashboardPage />} />
          <Route path="/dashboard" element={<Navigate to="/student" replace />} />
          <Route path="/digital-id" element={<DigitalIdPage />} />
          <Route path="/digital-card" element={<DigitalIdPage />} />
          <Route path="/id-card" element={<DigitalIdPage />} />
          <Route path="/id" element={<DigitalIdPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/achievements" element={<CertificatesPage />} />
          <Route path="/guide" element={<StudentGuidePage />} />
          <Route path="/student-guide" element={<StudentGuidePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </IconContext.Provider>
  );
}
