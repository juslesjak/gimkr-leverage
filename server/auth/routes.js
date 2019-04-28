var router = require('express').Router();
var controller = require('./controller');

// check with Password.js
router.route('/google/callback')
    .get(controller.google);

module.exports = router;