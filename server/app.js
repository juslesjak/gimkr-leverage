var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var oauth = require('./auth/routes');
var mongoose = require('mongoose');
var middleware = require('./middleware/appMiddleware')
var config = require('./config/config');
var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var ui = require('./ui/uiRoutes');

// Connect to mongoose
mongoose.connect(config.db.url, {
    useMongoClient: true,
});

// Set up helmet
app.use(helmet());
// Set up middleware
middleware(app);

// Serve static files
app.use(express.static('client/public'));

// Passport strategy. Dela samo na public IP Addressih
passport.use('google', new GoogleStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback', // a se ne klice to pol rekurzivno samga sebe
  }, async (req, accessToken, refreshToken, profile, cb) => {

    console.log('authenticated with google');
    console.log(profile);
      // Could get accessed in two ways:
      // 1) When registering for the first time
      // 2) When linking account to the existing one
    
    // Should have full user profile over here
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    return cb(null, profile);
}));
  
// Set up the api
app.use('/api', api);

// sm gor prides s klikom na <a href='/oauth/google'>Log In with Google</a> iz UI
app.use('/oauth', oauth);

// Set up UI
app.use('/', ui);

module.exports = app;

