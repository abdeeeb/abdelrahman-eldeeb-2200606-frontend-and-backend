import React, { useState, useEffect } from 'react';

const CarList = () => {
  const [cars, setCars] = useState([]);

  const getAllCars = () => {
    fetch('http://localhost:555/cars')
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching cars:', error));
  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <div className="form-section">
      <h3>Available Cars</h3>
      <button onClick={getAllCars}>Refresh Cars</button>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>{car.brand} {car.model} ({car.year}) - ${car.price}/day</li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
