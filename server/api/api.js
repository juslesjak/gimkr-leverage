var router = require('express').Router();
var categoryRoutes = require('./category/categoryRoutes');
var userRoutes = require('./user/userRoutes');

router.use('/categories', categoryRoutes)
router.use('/users', userRoutes)

module.exports = router;