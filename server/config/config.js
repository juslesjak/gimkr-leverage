var config = {
    dev: 'development',
    prod: 'production',
    test: 'test',
    port: process.env.PORT || 3000,
    db: {
      url: 'mongodb://localhost/ghk-gimkr'
    }
}

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;

module.exports = config