import React from 'react';

const ProductTable = ({ products, updateProduct, deleteProduct }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Stock</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.photo}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.quantity}</td>
            <td className="actions">
              <button onClick={() => updateProduct(product._id, { name: 'Updated Name', price: product.price, quantity: product.quantity })}>Update</button>
            </td>
            <td className="actions">
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
