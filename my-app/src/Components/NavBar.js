import React from 'react';
import { useAuth } from '../AuthContext';
import './NavBar.css';

const NavBar = ({ navigate }) => {
  const { isLoggedIn, isAdmin, logout } = useAuth();

  return (
    <nav className="nav-container">
      <div className="logo" onClick={() => navigate('Home')}>
        Car Rental
      </div>
      <ul className="nav-list">
        {!isLoggedIn ? (
          <>
            <li className="nav-item">
              <button className="nav-button" onClick={() => navigate('LoginForm')}>Login</button>
            </li>
            <li className="nav-item">
              <button className="nav-button" onClick={() => navigate('RegistrationForm')}>Registration</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <button className="nav-button" onClick={() => navigate('CarList')}>View Cars</button>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <button className="nav-button" onClick={() => navigate('AddCarForm')}>Add Car</button>
              </li>
            )}
            <li className="nav-item">
              <button className="nav-button" onClick={logout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
