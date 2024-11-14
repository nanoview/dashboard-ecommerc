import React from 'react';

const ProductTable = ({ products, updateProduct, deleteProduct }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td><img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} /></td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
              <button onClick={() => updateProduct(product._id, { name: 'Updated Name', price: product.price, quantity: product.quantity })}>Update</button>
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
