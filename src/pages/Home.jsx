import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import LogoutButton from '../components/LogoutButton';

const Home = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container">
      <h1>Smart Attendance System</h1>

      {userEmail ? (
        <>
          <p>Welcome, <strong>{userEmail}</strong></p>
          <p>Select your portal:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={() => navigate('/admin')}>Admin Portal</button>
            <button onClick={() => navigate('/teacher')}>Teacher Portal</button>
            <button onClick={() => navigate('/student')}>Student Portal</button>
          </div>

          <LogoutButton />
        </>
      ) : (
        <>
          <p>Welcome! Please log in or register to continue:</p>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => navigate('/login')} style={{ marginRight: '1rem' }}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
