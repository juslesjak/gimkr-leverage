var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var oauth = require('./auth/routes');
var mongoose = require('mongoose');
var middleware = require('./middleware/appMiddleware')
var path = require('path')

// Connect to mongoose
mongoose.connect(config.db.url);

// Set up middleware
middleware(app);

// Serve static files
app.use(express.static('public'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/inside', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index1.html'));
})
  
// Set up the api
app.use('/api', api);

// sm gor prides s klikom na <a href='/oauth/google'>Log In with Google</a>
app.use('/oauth', oauth);

module.exports = app;

