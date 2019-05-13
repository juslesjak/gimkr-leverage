var passport = require('passport');
var path = require('path');

//to gre v auth.js
exports.google = function(req, res, next) {
    passport.authenticate('google', { 
        scope: ['profile', 'email'], 
    })
};

exports.googleCallback = function(req, res, next) {
    passport.authenticate('google', {
        successRedirect : '/browse',
        failureRedirect: '/',
        sesstion: false
        })
};
