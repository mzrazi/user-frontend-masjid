import React, { useState } from 'react';
import Razorpay from "react-razorpay"; // Directly import Razorpay
import './Donate.css';
import Navbar from '../Navbar/Navbar';

const Donate = () => {
  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    if (!amount) {
      alert("Please enter a donation amount.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/user-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(amount) * 100 })
      });

      const orderData = await response.json();

      const options = {
        key: "rzp_test_mHGtVeceRk4I0h",
        amount: orderData.amount,
        currency: "INR",
        name: "Masjid Donation",
        description: "Support our Masjid",
        order_id: orderData.order_id,
        handler: function (response) {
          const paymentDetails = {
            userId: "USER_ID", 
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: orderData.amount,
            paymentDate: new Date().toISOString()
          };

          fetch('http://localhost:3000/api/paymentSuccess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentDetails)
          })
            .then(res => res.json())
            .then(data => {
              if (data.status === 'success') {
                alert('Donation successful. Thank you!');
              } else {
                console.error('Payment verification failed');
              }
            })
            .catch(error => console.error('Error sending payment details:', error));
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div className="donate-container">
      <Navbar/>
      <h2 className="donate-title">Donate</h2>
      <p className="donate-description">Your contribution helps support our Masjid and its community services.</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="donate-input"
      />
      <button onClick={handlePayment} className="donate-button">Donate Now</button>
    </div>
  );
};

export default Donate;
