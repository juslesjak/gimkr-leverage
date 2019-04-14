var router = require('express').Router();
var categoryRoutes = require('./category/categoryRoutes');
var userRoutes = require('./user/userRoutes');

// set up routers for specific api paths
router.use('/kategorije/', categoryRoutes)
router.use('/clani', userRoutes)

module.exports = router;