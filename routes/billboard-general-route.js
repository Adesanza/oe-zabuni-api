const router = require('express').Router();
const BillboardGeneralInfo = require('../models/billboard-general-info-model');
const Billboard = require('../models/billboard-model');
const getBillboardGeneralInfo = require('../utils/billboard-utils');

router.route('/').get(async (req, res, next) => {
  try {
    let billboardData = await Billboard.find();
    let billboardGeneralInfo = await BillboardGeneralInfo.findById(
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
