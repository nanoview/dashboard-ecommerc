import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductComponent = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!token) {
      navigate('/admin'); // Redirect to login if no token
    } else {
      fetchProducts();
    }
  }, [token, navigate]);

  const fetchProducts = async () => {
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
    const response = await axios.post('http://localhost:5000/api/products', newProduct, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts([...products, response.data]);
    setNewProduct({ name: '', price: '', quantity: '' });
  };

  const updateProduct = async (id, updatedProduct) => {
    const response = await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(products.map(product => (product._id === id ? response.data : product)));
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(products.filter(product => product._id !== id));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - {product.price} - {product.quantity}
            <button onClick={() => updateProduct(product._id, { name: 'Updated Name', price: product.price, quantity: product.quantity })}>Update</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductComponent;
