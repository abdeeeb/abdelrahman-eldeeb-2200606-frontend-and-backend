import React, { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import AddCarForm from './Components/AddCarForm';
import CarList from './Components/CarList';
import { AuthProvider } from './AuthContext'; // Import AuthContext

const App = () => {
  const [currentScene, setCurrentScene] = useState('home');

  const navigate = (scene) => {
    setCurrentScene(scene);
  };

  return (
    <AuthProvider> {/* Wrap app with AuthProvider */}
      <div className="App">
        <NavBar navigate={navigate} />
        <h1>Car Rental Management</h1>

        {currentScene === 'Home' && <p>Welcome to Car Rental Management</p>}
        {currentScene === 'RegisterationForm' && <RegistrationForm />}
        {currentScene === 'LoginForm' && <LoginForm navigate={navigate} />}
        {currentScene === 'CarList' && <CarList />}
        {currentScene === 'AddCarForm' && <AddCarForm navigate={navigate} />}
      </div>
    </AuthProvider>
  );
};

export default App;
