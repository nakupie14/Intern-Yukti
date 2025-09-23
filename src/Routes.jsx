import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound.jsx";
import InternshipResults from './pages/internship-results';
import Login from './pages/login';
import LandingPage from './pages/landing-page';
import QuestionnaireFlow from './pages/questionnaire-flow';
import ResumeUpload from './pages/resume-upload';
import Register from './pages/register';
import AdminDashboard from './pages/admin-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/internship-results" element={<InternshipResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/questionnaire-flow" element={<QuestionnaireFlow />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;