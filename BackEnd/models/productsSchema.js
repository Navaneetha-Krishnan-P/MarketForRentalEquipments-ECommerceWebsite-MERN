const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  category: String,
  name: String,
  type: String,
  image: String,
  price: String,
  search: String,
  available: { type: Boolean, default: true },  
});

const ProductDetails = mongoose.model("ProductDetails", productSchema);

module.exports = ProductDetails;

