var User = require('../api/user/userModel');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../config/config');

// scene k jih ne razumem:
var checkToken = expressJwt({ secret: 'blablabla' });

exports.decodeToken = function() {
  return function(req, res, next) {
  // ckeck if token was in query string and
  // place it on the req.headers.authorization header

  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization =  'Bearer ' + req.query.access_token; 
  }

  checkToken(req, res, next);
  };
};

exports.getFreshUser = function() {
  return function(req, res, next) {
    User.findById(req.user._id)
      .then(function(user) {
        if (!user) {
          res.status(401).send('Unauthorized');
        } else {
          req.user = user;
          next();
        }
      }, function(err) {
        next(err);
      })
  };
};

exports.verifyUser = function() {
  return function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    
    if (!username || !password) {
      res.status(400).send("Username and password required");
      return;
    }

    User.findOne({username: username})
      .then(function(user) {
        if (!user) {
          next(new Error("User not found"));
        } else {
          // check password
          if (!user.authenticate(password)) {
            next(new Error("Wrong password"));
          } else {
            req.user = user;
            next();
          }
        }
      }, function(err) {
        next(err);
      })
  };
};

exports.signToken = function(id) {
  return jwt.sign({_id: id}, config.secrets.jwt, {expiresInMinutes: config.expireTime}); // dopolni config file!
};
