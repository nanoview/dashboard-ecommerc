const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  photo: { type: String }, // URL or file path to the photo
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
