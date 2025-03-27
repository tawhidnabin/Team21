import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setChecking(false);
    };
    checkUser();
  }, []);

  if (checking) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ Check if role is allowed
  const role = user.user_metadata?.role;
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/no-access" />; // or show an "Unauthorized" page
  }

  return children;
};

export default ProtectedRoute;
