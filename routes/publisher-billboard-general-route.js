const router = require('express').Router();
const {
  PublisherBillboard,
  PublisherBillboardGeneralInfo,
} = require('../models/');
const getBillboardGeneralInfo = require('../utils/billboard-utils');

router.route('/').get(async (req, res, next) => {
  try {
    let billboardData = await PublisherBillboard.find();
    let billboardGeneralInfo = await PublisherBillboardGeneralInfo.findById(
      '60771bd79ca2321440e01653'
    );
    return res.json({
      billboard_info: {
        ...getBillboardGeneralInfo(billboardData),
        billboardCount: billboardGeneralInfo.billboardCount,
        billboardLastUpdated: billboardGeneralInfo.billboardLastUpdated,
      },
    });
  } catch (error) {
    console.log('err', error);
    next(error);
  }
});
module.exports = router;
