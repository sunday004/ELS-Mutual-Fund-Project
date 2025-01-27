// pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="hero">
        <h1>Mutual Fund Investment Calculator</h1>
        <p>Plan your financial future with our powerful calculation tools</p>
        <button onClick={() => navigate('/calculator')}>Get Started</button>
      </div>
      <div className="features">
        <div className="feature">
          <h3>Investment Planning</h3>
          <p>Calculate potential returns</p>
        </div>
        <div className="feature">
          <h3>Track History</h3>
          <p>Monitor your calculations</p>
        </div>
        <div className="feature">
          <h3>Smart Analytics</h3>
          <p>Data-driven insights</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;