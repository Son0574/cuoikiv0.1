const mongoose = require('mongoose');

const productBillSchema = new mongoose.Schema({
  bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity_product_bill: Number,
});

const ProductBill = mongoose.model('ProductBill', productBillSchema);

module.exports = ProductBill;
