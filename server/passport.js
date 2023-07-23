const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('./models'); // Assuming the User model is defined in a separate file



const facebookStrategy = new FacebookStrategy(
  {
    clientID: '539840835015788',
    clientSecret: '1ec6db703b085b4bb6b925e29265d2bd',
    callbackURL: 'http://localhost:3000/auth/facebook/callback', // Adjust the callback URL according to your setup
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create the user based on the Facebook profile information
      const [user, created] = await User.findOrCreate({
        where: { email: profile.emails[0].value },
        defaults: {
          name: profile.displayName,
          password: '', // Facebook authentication doesn't require a password
        },
      });

      if (created) {
        // New user, perform any additional actions if needed
      }

      // Call the `done` callback function with the authenticated user object
      done(null, user);
    } catch (error) {
      // Call the `done` callback function with the error
      done(error);
    }
  }
);

module.exports = facebookStrategy;

