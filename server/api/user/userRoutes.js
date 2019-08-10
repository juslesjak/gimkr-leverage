var router = require('express').Router();
var controller = require('./userController');

// get id (5d4dd804dc311c314c809f46) from url query
router.param('id', controller.params);

// route using controller functions
router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;
