const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const express = require('express');
const User = require('../models');

const router = express.Router();
require('dotenv').config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({
        email: profile.email,
        
      });
      if (!user) {
        console.log('Adding new Facebook user to DB..');
        const newUser = new User({
          email: profile.email,
          name: profile.name,
        
        });
        await newUser.save();
        return cb(null, profile);
      } else {
        console.log('Facebook user already exists in DB..');
        return cb(null, profile);
      }
    }
  )
);

router.get('/', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook/error',
  }),
  function (req, res) {
   
    res.redirect('/auth/facebook/success');
  }
);

router.get('/success', async (req, res) => {
  const userInfo = {
    email: req.user.email,
    name: req.user.name,
    
  };
  
  res.json({ user: userInfo });
});

router.get('/error', (req, res) => res.status(400).json({ message: 'Error logging in via Facebook' }));

router.get('/signout', (req, res) => {
  try {
    req.logout();

    res.json({ message: 'Successfully signed out Facebook user' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to sign out Facebook user' });
  }
});


module.exports = router;
