var passport = require('passport');

// to gre v auth.js
exports.google = function(req, res, next) {
    console.log('before authentication handler');
    passport.authenticate('google', { 
        scope: ['profile', 'email'], 
    })
    console.log('after authentication handler');

};

exports.googleCallback = function(req, res, next) {
    console.log('before callback authentication handler');
    passport.authenticate('google', {
        successRedirect : '/browse',
        failureRedirect: '/',
        session: false
        })
};
