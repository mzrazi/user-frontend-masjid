import React, { useEffect, useState } from 'react';
import './Events.css';
import Navbar from '../Navbar/Navbar';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events data from the backend API
    fetch('http://localhost:3000/api/view-events') // replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          setEvents(data.events); // Update to use the correct data structure
        }
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    
    <div className="events-container">
      <Navbar/>
      <h2 className="events-title">Upcoming Events</h2>
      <div className="events-list">
        {events.map(event => (
          <div key={event._id} className="event-card">
            <img src={event.imagePath} alt={event.title} className="event-image" />
            <div className="event-content">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
              <p className="event-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
