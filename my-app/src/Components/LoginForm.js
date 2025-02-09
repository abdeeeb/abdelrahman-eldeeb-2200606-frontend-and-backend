import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; // Import Auth context

const LoginForm = ({ navigate }) => {
  const { login } = useAuth(); // Get login function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:555/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          login(data.token, data.isAdmin);
          alert('Login successful');
          navigate('home');
        } else {
          alert('Invalid login');
        }
      })
      .catch((error) => alert('Error: ' + error.message));
  };

  return (
    <div>
      <h3>Login</h3>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <br />
      <button type="button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
