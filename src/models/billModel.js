const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  total_money_bill: Number,
  total_product_bill: Number,
  money_give_bill: Number,
  money_back_bill: Number,
  date_bill: Date,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
