const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'marketing', 'technical', 'operations', 'finance'],
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
