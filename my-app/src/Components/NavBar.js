import React from 'react';
import './NavBar.css';

const NavBar = ({ navigate }) => {
  return (
    <nav className="nav-container">
      <div className="logo" onClick={() => navigate('home')}>
        Car Rental
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <button className="nav-button" onClick={() => navigate('login')}>
            Login
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => navigate('register')}>
            Register
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => navigate('car-list')}>
            View Cars
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => navigate('add-car')}>
            Add Car
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
