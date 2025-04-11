import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { supabase } from "../services/supabase";

function QRGeneratorPage() {
  const [sessionCode, setSessionCode] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  // Fetch the current user session (teacher)
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      const user = data?.session?.user;
      if (error || !user) {
        alert("User not authenticated.");
        navigate("/login");
      } else {
        console.log("Logged in Teacher ID:", user.id);
        setUserId(user.id);
        setUserEmail(user.email);
      }
    };

    fetchUser();
  }, [navigate]);

  // Generate a QR code using the session code
  const handleGenerateQR = () => {
    if (!sessionCode.trim()) {
      alert("Please enter a session code");
      return;
    }
    setQRCode(sessionCode);
  };

  // Ensure a teacher row exists in the 'teachers' table for this user
  const ensureTeacherRow = async (teacherId) => {
    // Use maybeSingle() to not throw an error if no row is found
    const { data: teacherData, error } = await supabase
      .from("teachers")
      .select("*")
      .eq("teacher_id", teacherId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching teacher row:", error);
      alert("Error checking teacher row.");
      return false;
    }

    if (teacherData) {
      console.log("Teacher row already exists:", teacherData);
      return true;
    }

    // If no teacher row exists, insert one using the real teacher's email
    const { error: insertError } = await supabase.from("teachers").insert([
      {
        teacher_id: teacherId,
        full_name: "Default Teacher", // You may update this later
        email: userEmail,
        department: "Not Set"
      },
    ]);

    if (insertError) {
      console.error("Error inserting teacher row:", insertError);
      alert(`Failed to insert teacher row: ${insertError.message}`);
      return false;
    }

    console.log("Inserted new teacher row successfully.");
    return true;
  };

  // Save the session to Supabase
  const handleSaveSession = async () => {
    if (!sessionCode.trim() || !userId) {
      alert("Session code or teacher ID missing.");
      return;
    }

    // Ensure the teacher row exists; if not, insert it
    const teacherExists = await ensureTeacherRow(userId);
    if (!teacherExists) return;

    // Insert the session into the sessions table
    const { error } = await supabase.from("sessions").insert([
      {
        session_title: sessionCode,
        teacher_id: userId,
      },
    ]);

    if (error) {
      console.error("Error saving session:", error);
      alert("❌ Failed to save session. Check Supabase logs or schema.");
    } else {
      alert("✅ Session saved successfully!");
      navigate("/teacher-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">📌 QR Code Generator</h2>
        
        {/* Session Code Input */}
        <input
          type="text"
          value={sessionCode}
          onChange={(e) => setSessionCode(e.target.value)}
          placeholder="Enter Session Code"
          className="w-full border border-gray-300 px-4 py-2 rounded mb-4 text-gray-700"
        />
        
        {/* Button to Generate QR Code */}
        <button
          onClick={handleGenerateQR}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition mb-4"
        >
          Generate QR Code
        </button>
        
        {/* Display QR Code if Generated */}
        {qrCode && (
          <div className="flex justify-center mb-4">
            <QRCode value={qrCode} size={256} />
          </div>
        )}
        
        {/* Save Session Button */}
        {qrCode && (
          <button
            onClick={handleSaveSession}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 transition mb-4"
          >
            Save Session
          </button>
        )}
        
        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate("/teacher-dashboard")}
          className="w-full bg-gray-700 text-white py-2 px-4 rounded-md shadow hover:bg-gray-800 transition"
        >
          ⬅ Back to Teacher Dashboard
        </button>
      </div>
    </div>
  );
}

export default QRGeneratorPage;
