const express = require('express'),
  mongoose = require('mongoose'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  flash = require('connect-flash'),
  passport = require('passport'),
  setupPassport = require('./config/setuppassport'),
  routes = require('./routes/main'),
  app = express(),
  dotenv = require('dotenv'),
  staticDir = path.resolve(__dirname, 'public');

dotenv.config();

console.log(process.env.DB_PATH);
mongoose.connect(process.env.DB_PATH);
setupPassport();
app.use(express['static'](staticDir));

app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: '!@$%^&*())()_+_)(*&^%$#@<?',
  resave: true,
  saveUninitialized: true,
  maxAge: new Date(Date.now() + 3600000)
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// Start server
let server = app.listen(app.get('port'), () => {
    console.log(`KIFT listening on port ${app.get('port')}`);
});
