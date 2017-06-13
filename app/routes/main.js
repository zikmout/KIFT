const express = require('express'),
  User = require('../models/user'),
  router = new express.Router(),
  signup = require('./signup'),
  say = require('say'),
  login = require('./login'),
  async = require('async'),
  ensureAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    } else {
      next();
    }
  };

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.test1 = 'lmao';
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  res.locals.isKift = false;
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

router.get('/playsong', (req, res) => {
	res.render('playsong', {title: 'Listen and enjoy the music now'});
})

router.get('/searchweb/:word', (req, res) => {
	say.speak('Lets go on google find out what ' + req.params.word + ' means');
	res.redirect('http://www.google.com/search?q=' + req.params.word);
})

router.get('/:user/getgeoloc/', (req, res) => {
	say.speak('Here is your geolocalisation ' + req.params.user);
	res.render('getgeoloc', {title: 'User' + req.params.user + ' has been geolocalized here :'});
})

router.get('/:user/kift/:audio', (req, res) => {
	//need other parameter audio in the URI
console.log('beginning executing kift...');
	var cmd1 = "./src/kift " + req.params.audio + " " + req.params.user;
	console.log(cmd1);
	console.log(req.params);

var exec = require('child_process').exec;
exec(cmd1, function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    if (error !== null) {
        console.log('exec error: ', error);
    }
});

});

router.get('/kift', ensureAuthenticated, (req, res) => {
  res.render('kift', {title: 'Kift - Personal assistant', isKift: true});
})

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
