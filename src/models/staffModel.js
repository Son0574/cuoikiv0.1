const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  avatar_staff: String,
  full_name_staff: String,
  email_staff: String,
  name_staff: String,
  password_staff: String,
  date_staff: Date,
  status_staff: Boolean,
  check_click_email_staff: Boolean, 
  check_change_new_password_first_time_staff: Boolean,
  email_verification_token: String,
  email_verification_token_expiration: Date,
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
