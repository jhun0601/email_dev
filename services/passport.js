const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleCLientID,
    clientSecret: keys.googleCLientSecret,
    callbackURL: 'a/auth/google/callback',
    proxy : true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id})
          //have records
      if (existingUser) {
        return done(null, existingUser);
      }
        //no record, create new
      const user = await new User({ googleId: profile.id }).save();
        done(null, user);


     // console.log('access token:', accessToken);
    // console.log('refresh token:', refreshToken);
    // console.log('profile:', profile);
    }
  )
);
