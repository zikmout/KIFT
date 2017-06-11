const express = require('express'),
  passport = require('passport'),
  router = new express.Router(),
  User = require('../models/user');

router.get('/', (req, res) => {
  res.render('signup', {
    title: 'Join Us'
  });
});

router.post('/', (req, res, next) => {
  const firstName = req.body.firstName,
    lastName = req.body.lastName,
    email = req.body.email,
    password = req.body.password;

  User.findOne({
    email
  }, (err, user) => {
    if (err) {
      return next(err);
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password
    });

    newUser.save(next);
  });
}, passport.authenticate('login', {
  failureRedirect: '/signup',
  failureFlash: true
}), (req, res) => {
  res.redirect(req.session.returnTo || '/');
  delete req.session.returnTo;
});

module.exports = router;
