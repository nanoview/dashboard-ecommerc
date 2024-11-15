import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import ProductComponent from './components/ProductComponent';
import LogoutComponent from './components/LogoutComponent';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AuthComponent setToken={setToken} />} />
        <Route path="/dashboard/*" element={<ProductComponent token={token} />} />
        <Route path="/logout" element={<LogoutComponent setToken={setToken} />} />
        <Route path="/" element={<h1>Welcome to the Main Site</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
