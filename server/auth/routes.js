var router = require('express').Router();
var controller = require('./controller');
var verifyUser = require('./auth').verifyUser;

router.post('/signin', verifyUser(), controller.signin);

module.exports = router;