// route using controller functions

var router = require('express').Router();
var controller = require('./userController');

// get id from url query
router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post)

// get only one user
router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;

