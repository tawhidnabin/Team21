import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

const TeacherPortal = () => {
  const [sessionCode, setSessionCode] = useState('');
  const [showQR, setShowQR] = useState(false);

  const generateQRCode = async () => {
    if (!sessionCode.trim()) return;

    setShowQR(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Please login first');
      return;
    }

    const { error } = await supabase.from('sessions').insert([
      {
        session_code: sessionCode,
        teacher_email: user.email,
      },
    ]);

    if (error) {
      console.error('Insert error:', error.message);
      alert('❌ Failed to save session: ' + error.message);
    } else {
      alert('✅ Session saved successfully!');
    }
  };

  return (
    <div className="container">
      <h2>Teacher Portal</h2>
      <p>Generate a QR Code for today's class session:</p>

      <input
        type="text"
        placeholder="Enter Session Code (e.g., CSC101-26-03)"
        value={sessionCode}
        onChange={(e) => setSessionCode(e.target.value)}
        style={{ padding: '8px', marginRight: '10px', width: '300px' }}
      />
      <button onClick={generateQRCode}>Generate QR</button>

      {showQR && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Scan this QR code:</h4>
          <QRCodeSVG value={sessionCode} size={200} />
          <p><strong>Session:</strong> {sessionCode}</p>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <Link to="/my-sessions">📋 View My Sessions</Link>
        <br />
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
};

export default TeacherPortal;
