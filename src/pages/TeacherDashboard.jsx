import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const TeacherDashboard = () => {
  const [records, setRecords] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

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

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Teacher Dashboard</h2>
      <p>Welcome, {userEmail}</p>

      {loading ? (
        <p>Loading attendance...</p>
      ) : records.length === 0 ? (
        <p>No attendance data yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
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

      <LogoutButton />
      <div style={{ marginTop: '1rem' }}>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;
