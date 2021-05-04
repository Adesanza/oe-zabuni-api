const router = require('express').Router();
const BillboardGeneralInfo = require('../models/billboard-general-info-model');
const Billboard = require('../models/billboard-model');

router.route('/all').get(async (req, res, next) => {
  try {
    return res.json({ billboardData: await Billboard.find() });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});
router.route('/create').post(async (req, res, next) => {
  try {
    const billboard = await Billboard.create(req.body);
    if (billboard) {
      await BillboardGeneralInfo.findByIdAndUpdate('60771bd79ca2321440e01653', {
        $inc: { billboardCount: 1 },
        billboardLastUpdated: Date.now(),
      });
    }
    return res.json({ billboardData: billboard });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const billboard = await Billboard.findById(req.params.id);
      return res.json({ billboardData: billboard });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const billboard = await Billboard.findByIdAndUpdate(
        req.params.id,
        { ...req.body, timestamp: Date.now() },
        { runValidators: true, new: true }
      );
      if (billboard) {
        await BillboardGeneralInfo.findByIdAndUpdate(
          '60771bd79ca2321440e01653',
          {
            billboardLastUpdated: Date.now(),
          }
        );
      }
      return res.json({ billboardData: billboard });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const billboard = await Billboard.findByIdAndRemove(req.params.id);
      if (billboard) {
        await BillboardGeneralInfo.findByIdAndUpdate(
          '60771bd79ca2321440e01653',
          {
            $inc: { billboardCount: -1 },
            billboardLastUpdated: Date.now(),
          }
        );
      }
      return res.json({ billboardData: billboard });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  });

module.exports = router;
