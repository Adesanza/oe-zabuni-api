const mongoose = require("mongoose");

const billboardGeneralInfoSchema = new mongoose.Schema({
    billboardCount: {
        type: Number,
    },
    billboardLastUpdated: {
        type: Date
    }
})



const BillboardGeneralInfo = mongoose.model('billboardGeneralInfo',billboardGeneralInfoSchema);

module.exports = BillboardGeneralInfo;