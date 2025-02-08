import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import AddCarForm from './Components/AddCarForm';
import CarList from './Components/CarList';

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Car Rental Management</h1>
      <RegistrationForm />
      <LoginForm />
      <CarList />
      <AddCarForm />
    </div>
  );
}

export default App;
