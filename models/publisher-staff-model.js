const mongoose = require('mongoose');

const publisherStaffSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  company_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'publisher',
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
  role: {
    type: String,
    enum: ['marketing', 'technical', 'operations', 'finance'],
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

const PublisherStaff = mongoose.model('publisherStaff', publisherStaffSchema);

module.exports = PublisherStaff;
