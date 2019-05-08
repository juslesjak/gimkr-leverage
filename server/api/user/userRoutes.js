var router = require('express').Router();
var controller = require('./userController');

// get username (Jus%20Lesjak) from url query
router.param('username', controller.params);

// route using controller functions
router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:username')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

router.route('/test')
    .post(function(req, res, next) {
        console.log('recieved request ', req.body);

        var data = req.user;
        res.send(data);
    })

module.exports = router;
