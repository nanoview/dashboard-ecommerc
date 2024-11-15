import React from 'react';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

const ProductManagement = ({ products, newProduct, setNewProduct, addProduct, updateProduct, deleteProduct }) => {
  return (
    <div className="form-container">
      <h2>Manage Products</h2>
      <ProductForm newProduct={newProduct} setNewProduct={setNewProduct} addProduct={addProduct} />
      <ProductTable products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />
    </div>
  );
};

export default ProductManagement;
