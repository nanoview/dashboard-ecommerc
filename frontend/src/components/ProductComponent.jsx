import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ProductTable from './ProductTable';

const ProductComponent = ({ token }) => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });
    const navigate = useNavigate();

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
        try {
            const response = await axios.post('http://localhost:5000/api/products', newProduct, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts([...products, response.data]);
            setNewProduct({ name: '', price: '', quantity: '' });
        } catch (error) {
            console.error('Error adding product:', error.response ? error.response.data : error.message);
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
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
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="dashboard">
            <Navbar />
            <div className="main-content">
                <Sidebar />
                <div className="content">
                    <div className="product-management">
                        <h2>Manage Products</h2>
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
                        <ProductTable products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductComponent;
