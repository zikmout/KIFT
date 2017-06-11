const passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  mongoose = require('mongoose'),
  User = require('../models/user'),
  checkPassword = (user, password, done) => {
    user.checkPassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) {
        return done(null, false, {message: 'Invalid password.'});
      }

      return done(null, user);
    });
  };

passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (username, password, done) => {
  User.findOne({email: username}, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, {message: 'No user has that email.'});
    }
    checkPassword(user, password, done);
  });
}));

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
