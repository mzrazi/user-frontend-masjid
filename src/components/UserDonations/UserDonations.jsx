import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this import is included
import './UserDonations.css';
import Navbar from '../Navbar/Navbar';

const UserDonations = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // This initializes useNavigate

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      const response = await fetch('http://localhost:3000/api/user-all-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch donation data');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setDonations(data.paymentStatuses);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="donations-container">
        <Navbar/>
      <button className="back-button" onClick={() => navigate('/donate')}>Back to Donate</button>
      
      <h2 className='title-don'>Your Donations</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : donations.length > 0 ? (
        <table className="donations-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Donation ID</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                <td>{donation.amount}</td>
                <td>{donation._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No donations found.</p>
      )}
    </div>
  );
};

export default UserDonations;
