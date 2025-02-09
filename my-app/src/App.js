import React, { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import CarList from './Components/CarList';
import AddCarForm from './Components/AddCarForm';
import { AuthProvider } from './AuthContext';

const App = () => {
  const [currentScene, setCurrentScene] = useState('home');

  const navigate = (scene) => {
    console.log(`Navigating to: ${scene}`); // Debugging log
    setCurrentScene(scene);
  };

  return (
    <AuthProvider>
      <div className="App">
        <NavBar navigate={navigate} />
        <h1>Car Rental Management</h1>

        {currentScene === 'Home' && <p>Welcome to Car Rental Service</p>}
        {currentScene === 'RegistrationForm' && <RegistrationForm navigate={navigate} />}
        {currentScene === 'LoginForm' && <LoginForm navigate={navigate} />}
        {currentScene === 'CarList' && <CarList />}
        {currentScene === 'AddCarForm' && <AddCarForm navigate={navigate} />}
      </div>
    </AuthProvider>
  );
};

export default App;
