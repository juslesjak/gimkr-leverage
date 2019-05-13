var express = require('express');
var app = express();
var middleware = require('./middleware/appMiddleware')
var api = require('./api/api');
var ui = require('./ui/uiRoutes');
var config = require('./config/config');
var auth = require('./auth/auth');
var authRoutes = require('./auth/routes');
var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var User = require('./api/user/userModel');
const crypto = require('crypto');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');


// Connect to mongoose
var dbUrl = process.env.MONGOLAB_CHARCOAL_URI || 'mongodb://localhost/newdb';
var conn = mongoose.connect(dbUrl, {
    useMongoClient: true,
});

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('pictures'); // collection name
});

// Create storage engine
const storage = new GridFsStorage({
    url: dbUrl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
            return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
            filename: filename,
            bucketName: 'pictures'
            };
            resolve(fileInfo);
        });
        });
    }
});

//  
const upload = multer({ storage });

// Set up middleware
middleware.setMiddleware(app);

// Set up the api
app.use('/api', api);

// Set up UI
app.use('/', ui);

// Set up auth
app.use('/auth', authRoutes);

// Serve static files
app.use(express.static('client/public'));

var googleConfig = {
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret,
    callbackURL: 'http://127.0.0.1:5000/auth/google/callback',
    scope: ['profile', 'email'],
}

// Passport strategy
passport.use('google', new GoogleStrategy(googleConfig, auth.googleStrategy));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({'google.id':id})
        .then(function(user) {
            done(null, user)
        })
});

module.exports = app;
