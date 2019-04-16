var _ = require('lodash');

var config = {
    dev: 'development',
    prod: 'production',
    test: 'testing',
    port: process.env.PORT || 3000,
    expireTime: 24 * 60 * 10,
    secrets: {
      jwt: process.env.JWT || 'skrivnost'
    }
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
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