import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const AdminPanel = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error:', error);
    } else {
      setRecords(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <p>All attendance records:</p>

      {loading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Student Email</th>
              <th>Session Code</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.user_email}</td>
                <td>{r.session_code}</td>
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

export default AdminPanel;
