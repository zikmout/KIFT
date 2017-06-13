const express = require('express'),
  passport = require('passport'),
  router = new express.Router();

router.get('/', (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});

router.post('/', passport.authenticate('login', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  res.redirect('/kift');
});

module.exports = router;
