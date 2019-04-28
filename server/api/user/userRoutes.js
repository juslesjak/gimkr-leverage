var info = function() {
  return function(req, res, next) {
    console.log("REQ:BODY: " + req.body);
    next();
  }
}

var router = require('express').Router();
var controller = require('./userController');

// get id from url query
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
