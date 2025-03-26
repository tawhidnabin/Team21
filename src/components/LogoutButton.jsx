import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <button onClick={handleLogout} style={{ marginTop: '20px' }}>
      🔓 Logout
    </button>
  );
};

export default LogoutButton;
