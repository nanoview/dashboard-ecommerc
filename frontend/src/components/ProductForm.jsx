import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const ProductForm = ({ newProduct, setNewProduct, addProduct }) => {
  const [photoLink, setPhotoLink] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('quantity', newProduct.quantity);
    formData.append('description', newProduct.description);
    if (photoFile) {
      formData.append('photo', photoFile);
    } else if (photoLink) {
      formData.append('photo', photoLink);
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include token in request headers
        },
      });
      setNewProduct({ name: '', price: '', quantity: '', description: '', photo: '' });
      addProduct(response.data);
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Add product here</h2>
      <form className="form-container" onSubmit={handleSubmit}>
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
        <textarea
          placeholder="Product Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Photo Link"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
