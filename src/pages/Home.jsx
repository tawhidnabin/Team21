import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to Smart Attendance System</h1>
      <p>Select your portal to continue:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <button onClick={() => navigate('/admin')}>Admin Portal</button>
        <button onClick={() => navigate('/teacher')}>Teacher Portal</button>
        <button onClick={() => navigate('/student')}>Student Portal</button>
      </div>
    </div>
  );
};

export default Home;
