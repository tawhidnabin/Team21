import React from "react";
import QRScanner from "../components/QRScanner";

function StudentDashboard() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">🎓 Student Dashboard</h1>
      <QRScanner />
    </main>
  );
}

export default StudentDashboard;
