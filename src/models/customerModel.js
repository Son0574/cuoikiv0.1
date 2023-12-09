const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  phone_customer: String,
  name_customer: String,
  address_customer: String
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
