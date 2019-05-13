var router = require('express').Router();
var controller = require('./controller');

// check with Password.js
router.route('/google')
    .get(controller.google);

router.route('/google/callback')
    .get(controller.googleCallback);

module.exports = router;