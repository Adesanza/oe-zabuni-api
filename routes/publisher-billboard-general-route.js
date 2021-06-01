const router = require('express').Router({ mergeParams: true });
const {
  PublisherBillboard,
  PublisherBillboardGeneralInfo,
} = require('../models/');
const getBillboardGeneralInfo = require('../utils/billboard-utils');

router.route('/').get(async (req, res, next) => {
  try {
    let billboardData = await PublisherBillboard.find({
      company_id: req.params.publisher_id,
    });
    let billboardGeneralInfo = await PublisherBillboardGeneralInfo.findOne({
      company_id: req.params.publisher_id,
    });
    const result = {
      billboard_info: {
        ...getBillboardGeneralInfo(billboardData),
        billboardCount: billboardGeneralInfo
          ? billboardGeneralInfo.billboardCount
          : 0,
        billboardLastUpdated: billboardGeneralInfo
          ? billboardGeneralInfo.billboardLastUpdated
          : null,
      },
    };
    // console.log(result);
    return res.json(result);
  } catch (error) {
    console.log('err', error);
    next(error);
  }
});
module.exports = router;
