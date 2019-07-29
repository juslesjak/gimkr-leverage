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
var path = require('path');


// Connect to mongoose
var dbUrl = process.env.MONGOLAB_CHARCOAL_URI || config.dbConnString;
var conn = mongoose.connect(dbUrl, {
    useNewUrlParser: true,
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

// to je zdej middleware k uploada na database ob POST requestu na /upload (oz kamorkol se bo postou createUpdate user)
var upload = multer({ storage: storage });

// Set up middleware
middleware.setMiddleware(app);

// Set up the api
app.use('/api', api);

app.post('/uploadFile', upload.single('file'), (req, res) => { //upload more bit kot del middlewara ne pa znotrej funkcije.
    res.json({file: req.file});
});
app.delete('/files/:filename', (req, res) => {
    gfs.exist({ length: req.params.filename }, function (err, file) {
        console.log(req.params.filename);
        if (err || !file) {
            res.send('File Not Found');
        } else {
            gfs.remove({ length: req.params.filename }, function (err) {
                if (err) res.send(err);
                res.send('File Deleted');
            });
        }
    });
});

// Set up UI
app.use('/', ui);

app.get('/images/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        if (file.contentType === 'image/jpeg' || file.contentType === 'img/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        };
    })
})

app.delete('/images/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        if (file.contentType === 'image/jpeg' || file.contentType === 'img/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        };
    })
})

// Set up auth
app.use('/auth', authRoutes);

// Serve static files
app.use(express.static('client/public'));

var googleConfig = {
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret,
    callbackURL: 'https://gimkrhussleclub.herokuapp.com/auth/google/callback',
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
