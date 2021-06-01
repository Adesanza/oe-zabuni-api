const router = require('express').Router({ mergeParams: true });
const {
  PublisherBillboard,
  PublisherBillboardGeneralInfo,
  Publisher,
} = require('../models/');

router.get('/', async (req, res, next) => {
  try {
    const billboard = await PublisherBillboard.find({
      company_id: req.params.publisher_id,
    });
    return res.json({ billboardData: billboard });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});
router.post('/create', async (req, res, next) => {
  console.log(req.params);
  try {
    const billboard = await PublisherBillboard.create({
      ...req.body,
      company_id: req.params.publisher_id,
    });
    if (billboard) {
      await PublisherBillboardGeneralInfo.findOneAndUpdate(
        {
          company_id: req.params.publisher_id,
        },
        {
          $inc: { billboardCount: 1 },
          billboardLastUpdated: Date.now(),
        },
        {
          upsert: true,
        }
      );
    }
    console.log('create-bill', billboard);
    return res.json({ billboardData: billboard });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const billboard = await PublisherBillboard.find({
      company_id: req.params.id,
    });
    return res.json({ billboardData: billboard });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});
router
  .patch('/:billboard_id', async (req, res, next) => {
    try {
      const billboard = await PublisherBillboard.findByIdAndUpdate(
        req.params.billboard_id,
        { ...req.body, timestamp: Date.now() },
        { runValidators: true, new: true }
      );
      if (billboard) {
        await PublisherBillboardGeneralInfo.findOneAndUpdate(
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
      const publisher = await Publisher.findById(req.params.publisher_id);
      const billboard = await PublisherBillboard.findByIdAndRemove(
        req.params.billboard_id
      );
      if (billboard) {
        const billboardIdx = publisher.company_billboards.findIndex(
          (id) => id == req.params.billboard_id
        );
        publisher.company_billboards.splice(billboardIdx, 1);
        await publisher.save();
        await PublisherBillboardGeneralInfo.findByIdAndUpdate(
          {
            company_id: req.params.publisher_id,
          },
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
