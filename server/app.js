require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const errorHandling = require('./middleware/errorHandler');
const router = require('./routers');
const facebookStrategy = require('./passport');
const midtransClient = require('midtrans-client');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
passport.use(facebookStrategy);

app.use(router);
app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    // This callback function will be executed after successful authentication
    // You can perform additional processing here, such as saving user information to the database or generating a JWT token
  
    // Send a JSON response with the authenticated user data
    res.json({ user: req.user });
  });
app.use(errorHandling);

module.exports = app