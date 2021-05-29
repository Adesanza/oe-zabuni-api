const { Publisher } = require('../models/');
const publisherStaffRouter = require('./publisher-staff-route');
const publisherBillboardRouter = require('./publisher-billboard-route');

const router = require('express').Router();

router.route('/').get(async (req, res, next) => {
  try {
    return res.json({ data: await Publisher.find() });
  } catch (error) {
    next(error);
  }
});

router.route('/create').post(async (req, res, next) => {
  try {
    const publisher = await Publisher.create({
      ...req.body,
    });
    return res.json({ publisher });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});
router.route('/login').post(async (req, res, next) => {
  try {
    const publisher = await Publisher.findOne({
      email: req.body.email,
      password: req.body.password,
    }).select('-password');
    if (publisher) {
      return res.json({ publisher });
    }
    return res.json({ message: 'Invalid email or password' });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

router.use('/staff', publisherStaffRouter);
router.use('/billboard', publisherBillboardRouter);

module.exports = router;
