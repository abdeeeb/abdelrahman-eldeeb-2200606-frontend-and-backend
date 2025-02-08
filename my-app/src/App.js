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
      <header>
        <h1>Car Rental Management</h1>
      </header>
      <main>
        <section>
          <h2>Registration</h2>
          <RegistrationForm />
        </section>
        
        <section>
          <h2>Login</h2>
          <LoginForm />
        </section>
        
        <section>
          <h2>Available Cars</h2>
          <CarList />
        </section>

        <section>
          <h2>Add a New Car</h2>
          <AddCarForm />
        </section>
      </main>
    </div>
  );
}

export default App;
