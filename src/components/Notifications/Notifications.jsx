import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar'; // Assuming this is your Navbar component path
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId'); // Retrieve the userId from local storage

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });

        const data = await response.json();
        if (data.success) {
          setNotifications(data.data);
        } else {
          setError(data.message || 'Error loading notifications');
        }
      } catch (err) {
        setError('Unable to fetch notifications. Please try again later.');
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div>
      <Navbar /> {/* Navbar component */}
      <div className="notifications-container">
        <h2>Notifications</h2>
        {error && <div className="error-message">{error}</div>}
        {notifications.length === 0 && !error && <p>No notifications found.</p>}
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li key={notification._id} className="notification-item">
              <h3 className="notification-title">{notification.title}</h3>
              <p className="notification-body">{notification.body}</p>
              <span className="notification-date">
                {new Date(notification.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
