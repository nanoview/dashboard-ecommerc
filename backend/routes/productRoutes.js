const express = require('express');
const multer = require('multer');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware'); // Correctly import middleware
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/products', authenticateToken, getProducts);
router.post('/products', authenticateToken, upload.single('photo'), createProduct); // Add multer middleware for file upload
router.put('/products/:id', authenticateToken, updateProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);

module.exports = router;
