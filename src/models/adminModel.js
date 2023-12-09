const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  avatar_admin: String,
  name_admin: String,
  password_admin: String
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
