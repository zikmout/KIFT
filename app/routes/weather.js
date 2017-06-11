const express = require('express'),
  User = require('../models/user'),
  router = new express.Router();

let ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  req.flash('info', 'You need to be logged in to view this page.');
  req.session.returnTo = req.originalUrl;
  return res.redirect('/login');
};

//weather
router.get('/:username/weather', ensureAuthenticated, (req, res) => {

	if (req.username == 'Simon')
		console.log('Simon is here...');
	res.render('profile', { user, title: `${username}'s PPPPRRROfile` });
//});
});
/*
  DarkSkyApi.apiKey = 'your-dark-sky-api-key';
  DarkSkyApi.proxyUrl = '//base-url-to-proxy/service';

  // optional configuration
  DarkSkyApi.units = 'si'; // default 'us'
  DarkSkyApi.language = 'de'; // default 'en'
  
  DarkSkyApi.postProcessor = (item) => { // default null;
  item.day = item.dateTime.format('ddd');
	return item;
  }

DarkSkyApi.loadCurrent()
	  .then(result => console.log(result));
*/

module.exports = router;
