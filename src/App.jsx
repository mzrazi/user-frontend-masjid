import React from 'react'

import Hero from './components/Hero/hero'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events from './components/Events/Events';
import Gallery from './components/Gallery/Gallery';
import Donate from './components/Donate/Donate';
import Login from './components/Login/Login';
import Prayertime from './components/Prayertime/prayertime';
import Recite from './components/Recite/Recite';
import Members from './components/Members/Members';




const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Events" element={<Events />} />
      <Route path="/Gallery" element={<Gallery/>} />
      <Route path="/Donate" element={<Donate/>} />
      <Route path="/Prayer-time" element={<Prayertime/>} />
      <Route path="/Recite" element={<Recite/>} />
      <Route path="/Members" element={<Members/>} />



     
    
    
    </Routes>
  </Router>   
  )    
} 

export default App