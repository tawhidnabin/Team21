import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../services/supabase";

function SignUpPage() {
  const { role } = useParams(); // Role from URL param
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [customId, setCustomId] = useState(""); // student_id or teacher_id
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");

    // Validation
    if (!email || !password || !fullName || (role !== "admin" && !customId)) {
      setError("Please fill in all required fields.");
      return;
    }

    // Create user in Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !signUpData?.user) {
      setError(signUpError?.message || "Signup failed.");
      return;
    }

    const userId = signUpData.user.id;

    // Insert into specific role table
    let table = role;
    let rowData = {
      id: userId,
      email,
      full_name: fullName,
    };

    if (role === "student") rowData.student_id = customId;
    else if (role === "teacher") rowData.teacher_id = customId;

    const { error: insertError } = await supabase.from(table).insert([rowData]);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    alert("Account created! Please verify your email and then log in.");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 capitalize text-indigo-700">
          {role} Sign Up
        </h2>

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border px-4 py-2 mb-3 rounded"
        />

        {role !== "admin" && (
          <input
            type="text"
            placeholder={role === "student" ? "Student ID" : "Teacher ID"}
            value={customId}
            onChange={(e) => setCustomId(e.target.value)}
            className="w-full border px-4 py-2 mb-3 rounded"
          />
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 mb-5 rounded"
        />

        <button
          onClick={handleSignUp}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
