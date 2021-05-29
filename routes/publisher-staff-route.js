const { PublisherStaff } = require('../models/');

const router = require('express').Router();

router.route('/').get(async (req, res, next) => {
  try {
    return res.json({ data: await PublisherStaff.find() });
  } catch (error) {
    next(error);
  }
});

router.route('/create').post(async (req, res, next) => {
  try {
    const staff = await PublisherStaff.create({
      ...req.body.staff,
      company_id: req.body.publisher_id,
    });
    console.log(staff);
    return res.json({ message: 'Successfully created staff' });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});
router.route('/login').post(async (req, res, next) => {
  try {
    const staff = await PublisherStaff.findOne({
      email: req.body.email,
      password: req.body.password,
    }).select('-password');
    if (staff) {
      return res.json({ data: staff });
    }
    return res.json({ message: 'Invalid email or password' });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

module.exports = router;
