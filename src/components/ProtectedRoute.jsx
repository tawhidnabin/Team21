import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setChecking(false);
    };

    getUser();
  }, []);

  if (checking) return <p>Checking login status...</p>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
