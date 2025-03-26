import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const TeacherPortal = () => {
  const [sessionCode, setSessionCode] = useState('');
  const [showQR, setShowQR] = useState(false);

  const generateQRCode = () => {
    if (sessionCode.trim() !== '') {
      setShowQR(true);
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

      <LogoutButton />
      <div style={{ marginTop: '2rem' }}>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
};

export default TeacherPortal;
