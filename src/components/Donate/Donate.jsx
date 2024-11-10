import React, { useState } from 'react';
import './Donate.css';
import Navbar from '../Navbar/Navbar';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePayment = async () => {
    if (!amount) {
      setError("Please enter a donation amount.");
      return;
    }

    setError('');
    setLoading(true);

    try {
      // 1. Request backend to create order
      const response = await fetch('http://localhost:3000/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(amount)*100 })
      });

      
      const orderData = await response.json();
    

      // 2. Check if Razorpay SDK is loaded
      if (!window.Razorpay) {
        setError('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      // 3. Setup Razorpay options
      const options = {
        key: "rzp_test_6i5nQKZQNF4RNj",
        amount: orderData.orderAmount,
        currency: "INR",
        name: "Masjid Donation",
        description: "Support our Masjid",
        order_id: orderData.orderId,
        handler: async function (response) {
          
          console.log(response)
              // Retrieve the stored userId from localStorage
    const userId = localStorage.getItem('userId');  // Retrieve the userId
    if (!userId) {
      setError('User is not logged in.');
      setLoading(false);
      return;
    }
          const paymentDetails = {
            
            userId: userId,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: orderData.amount,
            paymentDate: new Date().toISOString()
          };
          

          // Send payment details to backend for verification
          try {
            const verifyResponse = await fetch('http://localhost:3000/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(paymentDetails)
            });
            
            const verifyData = await verifyResponse.json();
            if (verifyData.status === 'success') {
              setSuccess('Donation successful. Thank you!');
              setAmount('');
            } else {
              setError('Payment verification failed. Please try again.');
            }
          } catch (error) {
            setError('Error sending payment details. Please try again.');
          }
        },
        theme: {
          color: "#3399cc"
        }
      };

      // 4. Open Razorpay payment modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setError('Error initiating payment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDonate = (quickAmount) => {
    setAmount(quickAmount);
  };

  return (
    <div className="donate-container">
      <Navbar />
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
