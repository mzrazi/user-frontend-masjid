import React from 'react'
import { Link } from 'react-router-dom' // Import Link from react-router-dom
import "./Navbar.css"
import logo from "../../assets/logo.png"

const Navbar = () => {
  return (
    <nav className='container'>
      <img src={logo} alt="Logo" className='logo'/> 

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Events">Events</Link></li>
        <li><Link to="/prayer-time">Prayer Time</Link></li>
        <li><Link to="/Donate">Donate</Link></li>
        <li><Link to="/Gallery">Gallery</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
