import React from 'react';
import logo from '../images/MultiColoredLogo.png';
import './Header.css';

const Header = () => (
  <div className="header-container">
    <img className="logo" src={logo} alt="NETE logo" />
    <h5 className="tagline">MANAGEMENT CONSULTING | TECHNOLOGY SOLUTIONS | HEALTH IT | WEATHER</h5>
  </div>
);

export default Header;
