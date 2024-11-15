import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Admin</h3>
      <nav>
        <ul>
        <li><Link to="/dashboard/">Dashboard</Link></li>
          <li><Link to="/dashboard/product-form">Add Product</Link></li>
          <li><Link to="/dashboard/product-table">Product List</Link></li>
          <li><Link to="/dashboard/product-management">Manage Products</Link></li>
          <li><Link to="/dashboard/order-status">Order status</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
