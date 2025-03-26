import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const [records, setRecords] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      setUserEmail(user.email);

      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .eq('user_email', user.email)
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Error fetching records:', error.message);
      } else {
        setRecords(data);
      }

      setLoading(false);
    };

    fetchTeacherData();
  }, []);

  return (
    <div className="container">
      <h2>Teacher Dashboard</h2>
      <p>Welcome, {userEmail}</p>

      {loading ? (
        <p>Loading attendance data...</p>
      ) : records.length === 0 ? (
        <p>No sessions found yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: '1rem', width: '100%' }}>
          <thead>
            <tr>
              <th>Session Code</th>
              <th>Student Email</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.session_code}</td>
                <td>{r.user_email}</td>
                <td>{new Date(r.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: '2rem' }}>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;
