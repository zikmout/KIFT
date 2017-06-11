const express = require('express'),
  User = require('../models/user'),
  router = new express.Router();

let ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  req.flash('info', 'You need to be logged in to view this page.');
  req.session.returnTo = req.originalUrl;
  return res.redirect('/login');
};

router.get('/:username', (req, res, next) => {
  const username = req.params.username;
  User.findOne({ username }, (err, user) => {
    if (err) { return next(err);}
    if (!user) { return next(404); }
    res.render('profile', { user, title: `${username}'s Profile` });
  });
});

router.get('/:username/edit', ensureAuthenticated, (req, res) => {
  res.render('profile-edit', { title: 'Edit Your Profile' });
});

router.post('/:username/edit', ensureAuthenticated, (req, res, next) => {
  req.user.displayName = req.body.displayName;
  req.user.email = req.body.email;
  req.user.bio = req.body.bio;
  req.user.country = req.body.country;
  req.user.gender = req.body.gender;
  req.user.facebook = req.body.facebook;
  req.user.twitter = req.body.twitter;
  req.user.soundcloud = req.body.soundcloud;
  req.user.youtube = req.body.youtube;

  req.user.save(err => {
    if (err) { return next(err); }
    req.flash('info', 'Profile updated successfully.');
    res.redirect(`/user/${req.user.username}/edit`);
  });
});

router.get('/:username/delete', ensureAuthenticated, (req, res, next) => {
  if (req.user.username !== req.params.username) {
    req.flash('info', "You don't have enough power to do that");
    return res.redirect('/');
  }
  User.remove({ username: req.params.username }, err => {
    if (err) { return next(err); }
    req.flash('info', 'Profile deleted successfully');
    res.redirect('/');
  });
});

router.post('/search', ensureAuthenticated, (req, res, next) => {
  const username = req.body.username,
    queryLimit = parseInt(req.body.queryLimit, 10);

  User.find({ username: new RegExp(username, 'i') })
    .select('username')
    .limit(queryLimit)
    .exec((err, users) => {
      if (err) { return next(err); }
      // We make sure the user cannot see himself from the search box
      users = users.filter(user => user.username !== req.user.username);
      res.json(users);
    });
});

module.exports = router;
