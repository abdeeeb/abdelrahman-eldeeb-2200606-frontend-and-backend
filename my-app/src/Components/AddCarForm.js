import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Import Auth context

const AddCarForm = ({ navigate }) => {
  const { isLoggedIn } = useAuth(); // Get auth status

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  if (!isLoggedIn){
    console.log('You must be logged in as admin to add cars.');
    return <p>You must be logged in as admin to add cars.</p>;
  }

  const addCar = () => {
    fetch('http://localhost:555/cars/addcar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brand, model, year, price }),
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add car');
        }
        setMessage('Car added successfully');
        alert('Car added successfully');
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
        alert(error.message);
      });
  };

  return (
    <div className="form-section">
      <h3>Add Car (Admin)</h3>
      <form>
        <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        <br />
        <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
        <br />
        <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
        <br />
        <input type="number" placeholder="Price per day" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <br />
        <button type="button" onClick={addCar}>Add Car</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCarForm;
