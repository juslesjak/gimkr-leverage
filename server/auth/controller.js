var passport = require('passport');

// to gre v auth.js
exports.google = function(req, res, next) {
    console.log('hit the google callback');
    passport.authenticate('google', { 
        scope: ['profile', 'email'], 
    })
};

exports.googleCallback = function(req, res, next) {
    passport.authenticate('google', {
        successRedirect : '/browse',
        failureRedirect: '/',
        session: false
        })
};
