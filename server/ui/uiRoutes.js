var router = require('express').Router();
var controller = require('./uiController');
var middleware = require('../middleware/appMiddleware')
var isLoggedIn = middleware.isLoggedIn;

// get username (Jus%20Lesjak) from url query
router.param('username', controller.params);

// route using controller functions
router.route('/')
  .get(controller.getLogin)
  // mogoce pride v postev pr create new user => to ma react cez.
  //.post(controller.post)

router.route('/browse')
    .get(controller.getHome)

router.route('/create')
    .get(controller.postUser)

router.route('/users/:username')
  .get(controller.getOne)
  .delete(controller.delete)

router.route('/users/:username/edit')
    .get(controller.edit)

router.route('logout')
    .get(controller.logout)

module.exports = router;