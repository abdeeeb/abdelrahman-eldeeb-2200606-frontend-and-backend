import React, { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import AddCarForm from './Components/AddCarForm';
import CarList from './Components/CarList';

function App() {
  const [currentScene, setCurrentScene] = useState('home');

  const navigate = (scene) => {
    setCurrentScene(scene);
  };

  return (
    <div className="App">
      <NavBar navigate={navigate} />
      <h1>Car Rental Management</h1>

      {/* Conditional Rendering */}
      {currentScene === 'home' && <h2>Welcome to Car Rental Service</h2>}
      {currentScene === 'register' && <RegistrationForm navigate={navigate} />}
      {currentScene === 'login' && <LoginForm navigate={navigate} />}
      {currentScene === 'car-list' && <CarList navigate={navigate} />}
      {currentScene === 'add-car' && <AddCarForm navigate={navigate} />}
    </div>
  );
}

export default App;
