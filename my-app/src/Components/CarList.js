import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; // Import Auth context

const CarList = () => {
  const { isLoggedIn } = useAuth(); // Get auth status
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:555/cars')
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching cars:', error));
  }, []);

  if (!isLoggedIn) {
    console.log('You must be logged in to view available cars.');
    return <p>You must be logged in to view available cars.</p>;
  }

  return (
    <div>
      <h3>Available Cars</h3>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model} - {car.year} (${car.price}/day)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
