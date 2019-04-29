var passport = require('passport');

//to gre v auth.js
exports.google = function(req, res, next) {
    // passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });
    passport.authenticate('google', { faliureRedirect: '/login.html', session: false }), 
    (req, res) => {
        console.log('authenticated successfully, this is the user object:', req.user);
        res.json(req.user);
    } // google strategy je v passport.use(auth)
}
