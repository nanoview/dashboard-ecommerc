import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/dashboard">Products</Link></li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
