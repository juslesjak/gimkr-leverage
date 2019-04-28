var passport = require('passport');

//to gre v auth.js
exports.google = function(req, res, next) {
    // passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });
    passport.authenticate('google', { falieureRedirect: '/login.html', session: false }); // google strategy je v passport.use(auth)
}