import React from 'react';
import { Link } from 'react-router-dom';

const NoAccess = () => {
  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Why are you here?</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NoAccess;
