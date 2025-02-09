import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Ensure you are using the AuthContext

const LoginForm = ({ navigate }) => {
  const { login } = useAuth(); // Get login function from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5555/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Important for cookies to be stored
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const userData = await response.json();
      login(userData.token, userData.admin); // Update auth context
      alert('Login successful');
      navigate('home'); // Redirect to home page
    } catch (error) {
      setMessage(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="form-section">
      <h3>User Login</h3>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button type="button" onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default LoginForm;
