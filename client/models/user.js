const bcrypt = require('bcrypt-nodejs'),
  mongoose = require('mongoose'),
  userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    bio: {
      type: String,
      default: 'No user bio'
    },
    country: {
      type: String,
      default: 'unknown'
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      default: 'unknown'
    },
    email: {
      type: String,
      validate: /[^@]+@[^@]+/,
      unique: true,
      required: true
    }
  }),
  SALT_FACTOR = 10,
  noop = () => {};

userSchema.pre('save', function(done) {
  let user = this;
  if (!user.isModified('password')) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return done(err);
    }
    bcrypt.hash(user.password, salt, noop, (err, hashedPassword) => {
      if (err) {
        return done(err);
      }
      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.checkPassword = function (guess, done) {
  bcrypt.compare(guess, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

let User = mongoose.model('User', userSchema);

module.exports = User;
