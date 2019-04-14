var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
// var auth = require('./auth/routes');
var mongoose = require('mongoose');
var middleware = require('./middleware/appMiddleware')

// Connect to mongoose
mongoose.connect(config.db.url);

// Set up middleware
middleware(app);

// Set up the api
app.use('/api', api);
// app.use('/auth', auth);

module.exports = app;

