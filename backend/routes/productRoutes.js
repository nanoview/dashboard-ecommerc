const express = require('express');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authenticateToken =require('../middleware/authMiddleware');
const router = express.Router();

router.get('/products', authenticateToken, getProducts);
router.post('/products', authenticateToken, createProduct);
router.put('/products/:id', authenticateToken, updateProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);

module.exports = router;
