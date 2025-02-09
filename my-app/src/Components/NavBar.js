import React from 'react';
import './NavBar.css';

const NavBar = ({ navigate }) => {
  return (
    <nav className="nav-container">
      <div className="logo" onClick={() => navigate('Home')}>
        Car Rental
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <button className="nav-button" onClick={() => navigate('LoginForm')}>
            Login
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => navigate('RegisterationForm')}>
            Register
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => navigate('CarList')}>
            View Cars
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-button" onClick={() => navigate('AddCarForm')}>
            Add Car
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
