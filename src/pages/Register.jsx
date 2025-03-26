import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default role
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');

    // Step 1: Sign up user
    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role, // save role in user_metadata
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
    } else {
      alert('✅ Account created! Check your email to confirm registration.');
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <p>Create a new account:</p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '300px' }}
      />
      <input
        type="password"
        placeholder="Password (min 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '300px' }}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '300px' }}
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>

      <button onClick={handleRegister} style={{ padding: '10px 20px' }}>
        Register
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <p style={{ marginTop: '1rem' }}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
