import React, { useState } from 'react';
import './Donate.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Helper function to reset messages after a timeout
  const resetMessage = (setter, delay = 3000) => {
    setTimeout(() => setter(''), delay);
  };

  const handlePayment = async () => {
    // Payment code here (as in your original code)
  };

  const handleQuickDonate = (quickAmount) => {
    setAmount(quickAmount);
  };

  return (
    <div className="donate-container">
      <Navbar />

      {/* History button */}
      <button 
        className="history-button" 
        onClick={() => navigate('/UserDonations')}
      >
        History
      </button>

      <h2 className="donate-title">Make a Donation</h2>
      <p className="donate-description">Your generous contribution helps support our Masjid and its community services. Thank you for your support!</p>

      {/* Predefined donation amounts */}
      <div className="donate-quick-options">
        <button onClick={() => handleQuickDonate(100)} className="donate-option-btn">₹100</button>
        <button onClick={() => handleQuickDonate(500)} className="donate-option-btn">₹500</button>
        <button onClick={() => handleQuickDonate(1000)} className="donate-option-btn">₹1000</button>
      </div>

      {/* Donation input */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="donate-input"
        min="1"
      />

      {/* Error and success messages */}
      {error && <div className="donate-message donate-error">{error}</div>}
      {success && <div className="donate-message donate-success">{success}</div>}

      {/* Donate button */}
      <button 
        onClick={handlePayment} 
        className="donate-button" 
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Donate Now'}
      </button>
    </div>
  );
};

export default Donate;
