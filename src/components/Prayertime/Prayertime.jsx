import React, { useState, useEffect } from 'react';
import './Prayertime.css';
import Navbar from '../Navbar/Navbar';

const Prayertime = () => {
  const [prayerTimes, setPrayerTimes] = useState({});

  useEffect(() => {
    fetch('http://api.aladhan.com/v1/timingsByCity?city=kochi&country=india&method=2')
      .then(response => response.json())
      .then(data => {
        setPrayerTimes(data.data.timings);
      })
      .catch(error => console.error('Error fetching prayer times:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="prayer-time-container">
        <h2>Prayer Times</h2>
        <div className="prayer-time-list">
          {Object.entries(prayerTimes).map(([prayer, time]) => (
            <div key={prayer} className="prayer-time-item">
              <span className="prayer-name">{prayer}</span>
              <span className="prayer-time">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prayertime;
