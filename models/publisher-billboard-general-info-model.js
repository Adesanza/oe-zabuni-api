const mongoose = require('mongoose');

const billboardGeneralInfoSchema = new mongoose.Schema({
  billboardCount: {
    type: Number,
  },
  billboardLastUpdated: {
    type: Number,
  },
  company_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'company',
    },
  ],
});

const BillboardGeneralInfo = mongoose.model(
  'billboardGeneralInfo',
  billboardGeneralInfoSchema
);

module.exports = BillboardGeneralInfo;
