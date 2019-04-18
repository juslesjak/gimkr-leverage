var auth = require('../../auth/auth');
var info = function() {
  return function(req, res, next) {
    console.log("REQ:BODY: " + req.body);
    next();
  }
}

var checkUser = [auth.decodeToken(), auth.getFreshUser()];

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
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete)

module.exports = router;
