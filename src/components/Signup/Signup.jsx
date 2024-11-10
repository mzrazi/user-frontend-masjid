import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Separate CSS for Signup page
import masjidImage from '../../assets/bg3.jpg';

const Signup = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName:'',
    Address: '',
    Phone: '',
    Email: '',
    Password: '',
    Age: '',
    Gender: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up. Please try again.');
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src={masjidImage} alt="Masjid" />
      </div>
      <div className="signup-form">
        <h2>Create an Account</h2>
        <p>Please fill in the details below to sign up.</p>

        {error && <p className="error-message">{error}</p>}

        <label>First Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleChange}
        />

        <label>Last Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          name="LastName"
          value={formData.LastName}
          onChange={handleChange}
        />

        <label>Address</label>
        <input
          type="text"
          placeholder="Enter your address"
          name="Address"
          value={formData.Address}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
        />

        <label>Age</label>
        <input
          type="number"
          placeholder="Enter your age"
          name="Age"
          value={formData.Age}
          onChange={handleChange}
        />

        <label>Gender</label>
        <select name="Gender" value={formData.Gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button className="signup-button" onClick={handleSignup}>Sign Up</button>

        <p className="login-link">
          Already have an account? <a href="/">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
