var _ = require('lodash');

var config = {
    dev: 'development',
    prod: 'production',
    test: 'testing',
    port: process.env.PORT || 3000,
    expireTime: 24 * 60 * 10,
    oauth: {
        google: {
            clientID: '2285976511-mm4jb2mngdktvkq9g8l7n01n5m1m1qfp.apps.googleusercontent.com',
            clientSecret: 'rsMVVHn6xR_AS88TTIklixAd'
        }
    },
    dbConnString: 'mongodb://Yux:b3r59p89bctkifvkfam6rl6dqh@ds155606.mlab.com:55606/heroku_4f1mdk76'

};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev; //kle zj rabm spremenit v config.prod ce hocem herokulab mongo
config.env = process.env.NODE_ENV;

// envConfig = configuration specific for enviroment
var envConfig;

try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

module.exports = _.merge(config, envConfig);