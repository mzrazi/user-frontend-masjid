import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import masjidImage from '../../assets/bg3.jpg'; 

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to check if user is authenticated
  const isAuthenticated = () => !!localStorage.getItem('authToken');

  useEffect(() => {
    // Redirect to home page if already authenticated
    if (isAuthenticated()) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password }),
      });

      if (!response.ok) {
        throw new Error('Invalid Email or password');
      }

      const data = await response.json();

      // Save token to local storage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.user._id);

      // Redirect to the home page
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={masjidImage} alt="Masjid" />
      </div>
      <div className="login-form">
        <h2>Welcome Back!</h2>
        <p>Please log in to your account.</p>

        {error && <p className="error-message">{error}</p>}

        <label>Email</label>
        <input
          type="Email"
          placeholder="Enter your Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-options">
          <a href="#forgot">Forgot Password?</a>
        </div>

        <button className="login-button" onClick={handleLogin}>Login</button>

        <p className="signup-link">
          New here? <a href="/signup">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
