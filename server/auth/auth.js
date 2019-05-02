var User = require('../api/user/userModel');
var config = require('../config/config');
var passport = require('passport');
var googlePlusTokenStrategy = require('passport-google-plus-token');


// check login: local or google


// google strategy
passport.use('google', new GooglePlusTokenStrategy({
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



// // scene k jih ne razumem:
// var checkToken = expressJwt({ secret: 'blablabla' });

// exports.decodeToken = function() {
//   return function(req, res, next) {
//   // ckeck if token was in query string and
//   // place it on the req.headers.authorization header

//   if (req.query && req.query.hasOwnProperty('access_token')) {
//     req.headers.authorization =  'Token ' + req.query.access_token; 
//   }

//   checkToken(req, res, next);
//   };
// };

// // toj blo v JWT k si jim dodeljevou tokene. zdej je drgac.

// exports.getFreshUser = function() {
//   return function(req, res, next) {
//     User.findById(req.user._id)
//       .then(function(user) {
//         if (!user) {
//           res.status(401).send('Unauthorized');
//         } else {
//           req.user = user;
//           next();
//         }
//       }, function(err) {
//         next(err);
//       })
//   };
// };

// exports.verifyUser = function() {
//   return function(req, res, next) {
//     var username = req.body.username;
//     var password = req.body.password;
    
//     if (!username || !password) {
//       res.status(400).send("Username and password required");
//       return;
//     }

//     User.findOne({username: username})
//       .then(function(user) {
//         if (!user) {
//           next(new Error("User not found"));
//         } else {
//           // check password
//           if (!user.authenticate(password)) {
//             next(new Error("Wrong password"));
//           } else {
//             req.user = user;
//             next();
//           }
//         }
//       }, function(err) {
//         next(err);
//       })
//   };
// };

// exports.signToken = function(id) {
//   return jwt.sign({_id: id}, config.secrets.jwt, {expiresInMinutes: config.expireTime}); // dopolni config file!
// };
