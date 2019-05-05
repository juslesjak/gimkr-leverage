var router = require('express').Router();
var controller = require('./uiController');

// get username (Jus%20Lesjak) from url query
router.param('username', controller.params);

// route using controller functions
router.route('/')
  .get(controller.getLogin)
  // mogoce pride v postev pr create new user => to ma react cez.
  //.post(controller.post)

router.route('/brskaj')
    .get(controller.getHome)

router.route('/ustvari')
    .get(controller.postUser)

router.route('/:username')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;