const express = require('express'),
  User = require('../models/user'),
  router = new express.Router(),
  signup = require('./signup'),
  say = require('say'),
  login = require('./login'),
  async = require('async'),
  opn = require('opn'),
  fs = require('fs'),
  atob = require('atob');
ensureAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    } else {
      next();
    }
  },
  exec = require('child_process').exec,
  touch = require("touch"),
  multer = require('multer'),
  request = require('request'),
  songs = [{
      name: 'Feu! Chatterton - Fou à lier',
      path: 'feu-fou-a-lier.mp3'
    },
    {
      name: 'Flume - Insane feat. Moon Holiday',
      path: 'flume-insane-feat-moon-holiday.mp3'
    },
    {
      name: 'M83 - Midnight City',
      path: 'm83-midnight-city.mp3'
    }
  ];

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.test1 = 'lmao';
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  res.locals.isKift = false;
  next();
});

router.use('/signup', signup);
router.use('/login', login);

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Kift - Smart Online Personal assistant',
    isKift: true
  });
});

router.get('/alarm', function(req, res) => {
  res.render('alarm', {title: 'My Current Alarm'});
});

router.get('/searchweb/:word', (req, res) => {
  //say.speak('Lets go on google find out what ' + req.params.word + ' means');
  res.redirect('http://www.google.com/search?q=' + req.params.word);
})

router.get('/getgeoloc/', ensureAuthenticated, (req, res) => {
  //say.speak('Here is your geolocalisation ' + req.params.user);
  res.render('getgeoloc', {
    title: 'User' + req.user.username + ' has been geolocalized here :'
  });
})

router.get('/history', ensureAuthenticated, (req, res) => {
  const logFile = './logs/' + req.user.username + '/log.txt',
    lines = [];


  if (!fs.existsSync('./logs/' + req.user.username)) {
    fs.mkdirSync('./logs/' + req.user.username);
    touch('./logs/' + req.user.username + '/log.txt');
  }

  fs.readFileSync(logFile, {
    encoding: 'utf-8'
  }).split('\n').forEach(function(line) {
    if (line != '') {
      lines.push({
        msg: line.match(/(.+)\(/)[1],
        date: line.match(/_(\d+)/)[1]
      });
    }
  });

  res.render('history', {
    title: 'History of user commands',
    files: lines
  });
});

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function executeKift(req, res, filename) {
  console.log('beginning executing kift...');

  let userName = req.user.username,
    cmd1 = "./src/kift " + filename + " " + userName,
    instruction = 0,
    path = './logs/' + userName + '/response_instruction.txt';

  console.log(cmd1);

  exec(cmd1, function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    fs.readFile(path, function(err, data) {
      if (err) {
        console.dir(err);
        return res.send('Please, try again.');
      }
      instruction = data.toString();
      console.log('(Simon) **___---->> read instruction : ' + instruction);

      if (parseInt(instruction) == 4) {
        console.log('Command /playsong recognized');
        return res.send({
          cmd: 'play',
          song: songs[randNum(0, songs.length)]
        });
      } else if (parseInt(instruction) == 7) {
        console.log('Command search on google recognized');
        return res.send({
          path: 'http://www.google.com'
        });
      } else if (parseInt(instruction) == 9 || parseInt(instruction) == 10) {
        console.log('Command go on intra recognized');
        return res.send({
          path: 'http://intra.42.fr'
        });
      } else if (parseInt(instruction) == 21) {
        console.log('Command turn light on recognized');
        return res.send({
          cmd: 'light',
          state: 'on'
        });
      } else if (parseInt(instruction) == 22) {
        console.log('Command turn light off recognized');
        return res.send({
          cmd: 'light',
          state: 'off'
        });
      } else if (parseInt(instruction) == 1) {
        console.log('Command set alarm recognized');
        User.findById(req.user._id, function(err, user) {
          if (err) {
            return res.send('Something wrong happened, please, try again.');
          }

          user.alarm = Date.now() + (60 * 60 * 24);
          user.save(function() {
            return res.send('Alarm set. Please, check your Alarm page.');
          });
        })
        return res.send('Please, try again.');
      } else {
        console.log('No command recognized');
        return res.send('I did not recognize that command');
      }
    });
  });
}

router.post('/upload', (req, res) => {
  let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './audio/' + req.body.username + '/');
    },
    filename: function(req, file, cb) {
      cb(null, req.body.fname);
    }
  });

  let upload = multer({
    storage
  }).any();

  upload(req, res, function(err) {
    if (err) {
      console.dir(err);
      return res.send('Please, try again');
    } else {
      console.log(`File "${req.body.fname}" saved`);
      executeKift(req, res, req.body.fname);
    }
  });
});

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
