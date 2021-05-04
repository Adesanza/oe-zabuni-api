const User = require('../models/user-model');

const router = require('express').Router();

router.route('/admin/create').post(async (req, res, next) => {
  try {
    const user = await User.create({
      ...req.body,
    });
    return res.json({ message: 'Successfully created admin' });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});
router.route('/login').post(async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    }).select('-password');
    if (user) {
      return res.json({ data: user });
    }
    return res.json({ message: 'Invalid email or password' });
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

module.exports = router;
