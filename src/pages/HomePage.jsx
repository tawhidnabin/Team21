import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    navigate(`/signup/${role}`); // Navigate to the signup page based on the selected role
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleRoleSelection("student")}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Student
          </button>
          <button
            onClick={() => handleRoleSelection("teacher")}
            className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Teacher
          </button>
          <button
            onClick={() => handleRoleSelection("admin")}
            className="bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
