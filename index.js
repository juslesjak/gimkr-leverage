// intro point for our server.

// setup config first before anything by requiring it
var config = require('./server/config/config');
var app = require('./server/app');

app.listen(config.port);
console.log('listening on http://localhost:' + config.port);


