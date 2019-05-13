var router = require('express').Router();
var controller = require('./categoryController'); 

router.param('id', controller.param)

router.route('/')
  .get(controller.get)
  .post(controller.post)

// kva je ta id? to je mongo __id, npr 5cb4703b8913c015dc25d85e
router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;

