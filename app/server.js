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
  staticDir = path.resolve(__dirname, 'public'),
  User = require("./models/user"),
  request = require('request');

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
let server = app.listen(app.get('port'), '0.0.0.0', () => {
    console.log(`KIFT listening on port ${app.get('port')}`);
});

var io = require('socket.io')(server);
dl = require('delivery'),
file_saved = 0,
fs  = require('fs');

io.sockets.on('connection', function(socket){
  delivery = dl.listen(socket);
  delivery.on('receive.success',function(file){

    var userName = file.params.name.match(/([a-z_]+)_/)[1];

    if (!fs.existsSync('./audio/' + userName)) {
      fs.mkdirSync('./audio/' + userName);
    }
   console.log('LOG :' + './audio/' + userName + '/' + file.params.name);
    fs.writeFile('./audio/' + userName + '/' + file.params.name, file.buffer, function(err){
      if(err){
        console.log('File could not be saved.');
      }else{
        console.log('File saved.');
	io.sockets.emit('file.saved');
      }
    });
    });
});

