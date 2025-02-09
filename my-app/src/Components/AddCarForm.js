import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Import authentication

const AddCarForm = ({ navigate }) => {
  const { isLoggedIn, isAdmin } = useAuth(); // Get auth status
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  if (!isLoggedIn || !isAdmin) {
    return <p>You must be logged in as an admin to add cars.</p>;
  }

  const addCar = async () => {
    try {
      const response = await fetch('http://localhost:5555/cars/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand, model, year, price_per_day: price }),
        credentials: "include" // Ensures JWT authentication is sent
      });

      if (!response.ok) {
        throw new Error('Failed to add car');
      }

      setMessage('Car added successfully');
      alert('Car added successfully');
      navigate('cars'); // Redirect to the car list page
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      alert(error.message);
    }
  };

  return (
    <div className="form-section">
      <h3>Add Car (Admin Only)</h3>
      <form>
        <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        <br />
        <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
        <br />
        <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
        <br />
        <input type="number" placeholder="Price per day ($)" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <br />
        <button type="button" onClick={addCar}>Add Car</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddCarForm;
