import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import QRGeneratorPage from "./pages/QRGeneratorPage";

// Layout
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage with role selection */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />

        {/* Login Route */}
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />

        {/* Signup Route: /signup/student, /signup/teacher, /signup/admin */}
        <Route path="/signup/:role" element={<Layout><SignUpPage /></Layout>} />

        {/* Dashboards */}
        <Route path="/teacher-dashboard" element={<Layout><TeacherDashboard /></Layout>} />
        <Route path="/student-dashboard" element={<Layout><StudentDashboard /></Layout>} />
        <Route path="/admin-dashboard" element={<Layout><AdminDashboard /></Layout>} />

        {/* QR Generator Page */}
        <Route path="/generate-qr" element={<Layout><QRGeneratorPage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
