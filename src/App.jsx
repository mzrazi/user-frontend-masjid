import React from 'react'

import Hero from './components/Hero/hero'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events from './components/Events/Events';
import Gallery from './components/Gallery/Gallery';
import Donate from './components/Donate/Donate';
import Login from './components/Login/Login';
import Prayertime from './components/Prayertime/prayertime';
import Recite from './components/Recite/Recite';

import Signup from './components/Signup/Signup';
import UserDonations from './components/userDonations/userDonations';
import Notifications from './components/Notifications/Notifications';




const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/Home" element={<Hero />} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/" element={<Login/>} />
      <Route path="/Events" element={<Events />} />
      <Route path="/Gallery" element={<Gallery/>} />
      <Route path="/Donate" element={<Donate/>} />
      <Route path="/Prayer-time" element={<Prayertime/>} />
      <Route path="/Recite" element={<Recite/>} />
      <Route path="/UserDonations" element={<UserDonations/>} />
      <Route path="/Notifications" element={<Notifications/>} />
    



     
    
    
    </Routes>
  </Router>   
  )    
} 

export default App