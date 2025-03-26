import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import LogoutButton from '../components/LogoutButton';

const StudentPortal = () => {
  const [scanResult, setScanResult] = useState('');
  const [message, setMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (data) => {
    if (data) {
      const sessionCode = data.text || data;
      setScanResult(sessionCode);
      setIsScanning(false);

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setMessage("You must be logged in to mark attendance.");
        return;
      }

      const { error } = await supabase.from('attendance').insert([
        {
          user_email: user.email,
          session_code: sessionCode,
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
    console.error('QR Scan Error:', err);
    setMessage('Error scanning QR code.');
  };

  return (
    <div className="container">
      <h2>Student Portal</h2>
      <p>Scan the QR code shown by your teacher to mark attendance.</p>

      {!isScanning && (
        <button onClick={() => setIsScanning(true)}>Start Scanner</button>
      )}

      {isScanning && (
        <div style={{ marginTop: '1rem' }}>
          <QrScanner
            delay={300}
            style={{ width: '100%' }}
            onError={handleError}
            onScan={handleScan}
            constraints={{
              video: {
                facingMode: 'environment', // ✅ forces back camera
              },
            }}
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
