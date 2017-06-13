const express = require('express'),
  User = require('../models/user'),
  router = new express.Router(),
  signup = require('./signup'),
  say = require('say'),
  login = require('./login'),
  async = require('async'),
  child_process = require('child_process');

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
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
/*
router.get('/:user/kift/', (req, res) => {
console.log('beginning executing kift...');
	var cmd1 = "../src/kift " + "../tutorial/test_simon.wav " + req.params.user;
	console.log(cmd1);
	async.series([
	process.env.LD_LIBRARY_PATH='/home/ubuntu/SITE_WEB/app/tutorial/pocketsphinx-5prealpha/lib:/home/ubuntu/SITE_WEB/app/tutorial/sphinxbase-5prealpha/lib',
	process.env.PKG_CONFIG_PATH='/home/ubuntu/SITE_WEB/app/tutorial/sphinxbase-5prealpha:/home/ubuntu/SITE_WEB/app/tutorial/sphinxbase-5prealpha/src:/home/ubuntu/SITE_WEB/app/tutorial/pocketsphinx-5prealpha',
	process.env.PATH='/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/home/ubuntu/SITE_WEB/app/tutorial/sphinxbase-5prealpha/bin:/home/ubuntu/SITE_WEB/app/tutorial/pocketsphinx-5prealpha/bin:/home/ubuntu/SITE_WEB/app/tutorial/sphinxtrain-4prealpha/bin',
	
		async.apply(child_process.execFile, cmd1),
		async.apply(child_process.execFile, "echo 'finito is YES' > finito.txt")
		],
		function (err, res) {
			console.log(res);
		});
})
*/
router.get('/kift', (req, res) => {
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
