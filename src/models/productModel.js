const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  code_product: String,
  name_product: String,
  price_buy_product: Number,
  price_sell_product: Number,
  day_add_product: Date
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
