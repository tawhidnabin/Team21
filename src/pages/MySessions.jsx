import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('teacher_email', user.email)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load sessions:', error.message);
      } else {
        setSessions(data);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="container">
      <h2>📋 My Sessions</h2>

      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Session Code</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id}>
                <td>{s.session_code}</td>
                <td>{new Date(s.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <LogoutButton />
      <div style={{ marginTop: '1rem' }}>
        <Link to="/teacher">← Back to Teacher Portal</Link>
      </div>
    </div>
  );
};

export default MySessions;
