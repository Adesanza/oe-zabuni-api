const mongoose = require('mongoose');

const publisherBillboardGeneralInfoSchema = new mongoose.Schema({
  billboardCount: {
    type: Number,
  },
  billboardLastUpdated: {
    type: Number,
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'publisher',
    required: true,
  },
});

const PublisherBillboardGeneralInfo = mongoose.model(
  'publisherBillboardGeneralInfo',
  publisherBillboardGeneralInfoSchema
);

module.exports = PublisherBillboardGeneralInfo;
