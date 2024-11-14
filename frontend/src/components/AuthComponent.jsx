import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthComponent = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? 'register' : 'login';
    try {
      const response = await axios.post(`http://localhost:5000/api/${endpoint}`, { username, password });
      if (!isRegister) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // Redirect to dashboard
      }
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error during authentication:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
    </div>
  );
};

export default AuthComponent;
