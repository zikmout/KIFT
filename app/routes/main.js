const express = require('express'),
  User = require('../models/user'),
  router = new express.Router(),
  signup = require('./signup'),
  login = require('./login');
  weather = require('./weather'); //weather

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

router.get('/', (req, res, next) => {
  User.find()
    .sort({
      createdAt: 'descending'
    })
    .exec((err, users) => {
      if (err) {
        return next(err);
      }
      res.render('index', {
        users,
        title: 'Home'
      });
    });
});

router.use('/signup', signup);
router.use('/login', login);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use((err, req, res, next) => {
  console.log(err.stack);
  res
    .send('There was an error, we will fix it soon.');
});

router.use((req, res) => {
  res
    .status(404)
    .render('404', {
      title: 'Not Found'
    });
});

module.exports = router;
