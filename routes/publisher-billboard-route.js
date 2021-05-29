const router = require('express').Router();
const {
  PublisherBillboard,
  PublisherBillboardGeneralInfo,
} = require('../models/');

router.route('/all').get(async (req, res, next) => {
  try {
    return res.json({ billboardData: await PublisherBillboard.find() });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});
router.route('/create').post(async (req, res, next) => {
  try {
    const billboard = await PublisherBillboard.create(req.body);
    if (billboard) {
      await PublisherBillboardGeneralInfo.findByIdAndUpdate(
        '60771bd79ca2321440e01653',
        {
          $inc: { billboardCount: 1 },
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

router
  .route('/:id')
  .get(async (req, res, next) => {
    try {
      const billboard = await PublisherBillboard.find({
        company_id: req.params.id,
      });
      return res.json({ billboardData: billboard });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  })
  .patch(async (req, res, next) => {
    try {
      const billboard = await PublisherBillboard.findByIdAndUpdate(
        req.params.id,
        { ...req.body, timestamp: Date.now() },
        { runValidators: true, new: true }
      );
      if (billboard) {
        await PublisherBillboardGeneralInfo.findByIdAndUpdate(
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
      const billboard = await PublisherBillboard.findByIdAndRemove(
        req.params.id
      );
      if (billboard) {
        await PublisherBillboardGeneralInfo.findByIdAndUpdate(
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
