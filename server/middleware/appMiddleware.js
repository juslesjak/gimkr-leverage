// Logger for requests
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var helmet = require('helmet');
var methodOverride = require('method-override');

exports.setMiddleware = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({
        secret: 'blabla',
        resave: false,
        saveUninitialized: false
        }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors());
    app.use(helmet());
    app.use(methodOverride('_method'));
}

exports.isLoggedIn = function(res, req, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/');
}