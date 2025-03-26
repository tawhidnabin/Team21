import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QrReader from 'react-qr-reader';
import { supabase } from '../lib/supabaseClient';
import LogoutButton from '../components/LogoutButton';

const StudentPortal = () => {
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [message, setMessage] = useState('');

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);
      setIsScanning(false);

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setMessage("You must be logged in to mark attendance.");
        return;
      }

      const { error } = await supabase.from('attendance').insert([
        {
          user_email: user.email,
          session_code: data,
        },
      ]);

      if (error) {
        setMessage(`❌ Failed: ${error.message}`);
      } else {
        setMessage('✅ Attendance recorded!');
      }
    }
  };

  const handleError = (err) => {
    console.error('QR Error:', err);
    setMessage('Error accessing camera.');
  };

  return (
    <div className="container">
      <h2>Student Portal</h2>
      <p>Scan the QR code from your teacher.</p>

      {!isScanning && (
        <button onClick={() => setIsScanning(true)}>Start Scanner</button>
      )}

      {isScanning && (
        <div style={{ marginTop: '1rem' }}>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
          <button onClick={() => setIsScanning(false)} style={{ marginTop: '1rem' }}>
            Stop Scanner
          </button>
        </div>
      )}

      {scanResult && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Session:</strong> {scanResult}</p>
        </div>
      )}

      {message && (
        <p style={{ color: message.includes('❌') ? 'red' : 'green' }}>{message}</p>
      )}

      <LogoutButton />
      <div style={{ marginTop: '2rem' }}>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
};

export default StudentPortal;
