var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var auth = require('./auth/routes');
var mongoose = require('mongoose');
var middleware = require('./middleware/appMiddleware')
var helmet = require('helmet');
var config = require('./config/config');
var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var ui = require('./ui/uiRoutes');

// Connect to mongoose
var dbUrl = process.env.MONGOLAB_CHARCOAL_URI || 'mongodb://localhost/newdb';
mongoose.connect(dbUrl, {
    useMongoClient: true,
});

// Set up helmet
app.use(helmet());
// Set up middleware
middleware(app);

// Serve static files
app.use(express.static('client/public'));

// Passport strategy
passport.use('google', new GoogleStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret,
    callbackURL: 'https://gimkrhussleclub.herokuapp.com/auth/google/callback',
    scope: ['email'],
  }, (accessToken, refreshToken, profile, callback) => {

    console.log('authenticated with goGOOOGLEogle');
    console.log(profile);
      // Could get accessed in two ways:
      // 1) When registering for the first time
      // 2) When linking account to the existing one
    
    // Should have full user profile over here
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    return callback(null, profile);
}));
  
// Set up the api
app.use('/api', api);

// Set up auth
app.use('/auth', auth);

// Set up UI
app.use('/', ui);

module.exports = app;

