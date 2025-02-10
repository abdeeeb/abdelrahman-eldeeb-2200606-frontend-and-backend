import React, { useState } from 'react';

const RegistrationForm = ({ navigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const registerUser = async () => {
    try {
      const response = await fetch('http://localhost:5555/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed. Email might already be in use.');
      }

      setMessage('Registration successful! You can now log in.');
      alert('Registration successful!, Login to continue');
      navigate('login'); // Redirect user to login page
    } catch (error) {
      setMessage(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="form-section">
      <h3>User Registration</h3>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="button" onClick={registerUser}>Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RegistrationForm;
