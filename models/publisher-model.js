const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_logo: {
    type: String,
    default: '',
  },
  company_billboards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'publisherBillboard',
    },
  ],
  company_staffs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'publisherStaff',
    },
  ],
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: true,
  },
});

const Publisher = mongoose.model('publisher', publisherSchema);

module.exports = Publisher;
