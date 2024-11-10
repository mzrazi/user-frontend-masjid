import React, { useState, useEffect } from 'react';
import './Prayertime.css';
import Navbar from '../Navbar/Navbar';

const Prayertime = () => {
  const [prayerTimes, setPrayerTimes] = useState({});

  useEffect(() => {
    // Fetch prayer times from the API
    fetch('http://api.aladhan.com/v1/timingsByCity?city=kochi&country=india&method=2')
      .then(response => response.json())
      .then(data => {
        // Extract only the required prayer times and sunrise/sunset
        const filteredTimes = {
          Fajr: data.data.timings.Fajr,
          Dhuhr: data.data.timings.Dhuhr,
          Asr: data.data.timings.Asr,
          Maghrib: data.data.timings.Maghrib,
          Isha: data.data.timings.Isha,
          Sunrise: data.data.timings.Sunrise,
          Sunset: data.data.timings.Sunset
        };
        setPrayerTimes(filteredTimes);
      })
      .catch(error => console.error('Error fetching prayer times:', error));
  }, []);

  return (
    <div className="prayer-time-container">
        <Navbar />
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
  );
};

export default Prayertime;
