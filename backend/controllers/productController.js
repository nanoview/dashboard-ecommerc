// backend/controllers/productController.js
const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log('Fetched products:', products);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log('Product created:', newProduct);
    res.json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log('Product updated:', updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndDelete(req.params.id);
    console.log('Product deleted:', removedProduct);
    res.json(removedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
