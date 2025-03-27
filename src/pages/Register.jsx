import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [session, setSession] = useState('Morning');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          full_name: fullName,
          roll_number: rollNumber,
          class_name: studentClass,
          session: session,
          registered_at: new Date().toISOString(),
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
    } else {
      alert('✅ Account created! Check your email to confirm.');
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <p>Create a new account:</p>

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        style={inputStyle}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Class (e.g. Year 1 CS)"
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
        style={inputStyle}
      />

      <label style={{ marginTop: '10px' }}>Session:</label>
      <select
        value={session}
        onChange={(e) => setSession(e.target.value)}
        style={inputStyle}
      >
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Evening">Evening</option>
      </select>

      <label style={{ marginTop: '10px' }}>Select Role:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={inputStyle}
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleRegister} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Register
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <p style={{ marginTop: '1rem' }}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

const inputStyle = {
  display: 'block',
  marginBottom: '10px',
  padding: '8px',
  width: '300px',
};

export default Register;
