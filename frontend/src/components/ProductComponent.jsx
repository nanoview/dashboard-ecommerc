import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import ProductManagement from './ProductManagement';

const ProductComponent = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '', description: '', photo: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/admin'); // Redirect to login if no token
    } else {
      fetchProducts(storedToken);
      startInactivityTimer();
    }
  }, [navigate]);

  const fetchProducts = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin'); // Redirect to login if unauthorized
      }
    }
  };

  const addProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '', quantity: '', description: '', photo: '' });
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.map(product => (product._id === id ? response.data : product)));
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
    }
  };

  const startInactivityTimer = () => {
    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 15 * 60 * 1000); // 15 minutes
    };

    const logout = () => {
      localStorage.removeItem('token');
      navigate('/admin');
    };

    // Reset timer on activity
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onkeypress = resetTimer;

    resetTimer(); // Start the timer
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="product-form" element={<ProductForm newProduct={newProduct} setNewProduct={setNewProduct} addProduct={addProduct} />} />
            <Route path="product-table" element={<ProductTable products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />} />
            <Route path="product-management" element={<ProductManagement products={products} newProduct={newProduct} setNewProduct={setNewProduct} addProduct={addProduct} updateProduct={updateProduct} deleteProduct={deleteProduct} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
