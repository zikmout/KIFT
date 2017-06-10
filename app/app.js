var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
r = require('rethinkdb');
var connection = null;


//load mongoose package
//var mongoose = require('mongoose');

// Use native node promises
//mongoose.Promise = global.Promise;
  r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;

//connect to MongoDB
//mongoose.connect('mongodb://localhost/data');
//  .then(() => console.log('connection succesful'))
//  .catch((err) => console.error(err));

//var UserSchema = require('./data/models/schemes.js');

//use this to make a static path for the template engine
//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.use('/', express.static(__dirname + '/'));
//app.engine('ejs-locals', engine);
//app.set('views', './views');
var errorHandler = require('express-error-handler');
var http = require('http');
var path = require('path');
var url = require('url');
var jsonfile = require('jsonfile');
var bodyparser = require('body-parser');

// Allow all headers for cross domain
// app.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

//importing database schema's i.e models
//var Users = require('./data/users_schema.js');
//var Projects = require('./data/projects_schema.js');
//var Requests = require('./data/requests_schema.js');

//importing modules
var email = require('./email.js');


var users = require('./users/modules/users.js');
var routes_users = require('./users/routes/routes.js')(app, path, users, connection, r);

var projects = require('./projects/modules/projects.js');
var routes_projects = require('./projects/routes/routes.js')(app, path, projects, connection, r);

// start de server listening
//var server = app.listen(8082, 'localhost', function () {
var server = app.listen(8082, '0.0.0.0', function () {

  var host = server.address().address
  var port = server.address().port
  console.log('listening at port: ' + port + ' host: ' + host);
})
});
