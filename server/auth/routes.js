var router = require('express').Router();
var controller = require('./controller');
var passport = require('passport');


// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}));

// callback route for google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.send('blabla');
});

module.exports = router;