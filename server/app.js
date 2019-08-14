var express = require('express');
var app = express();
var middleware = require('./middleware/appMiddleware')
var api = require('./api/api');
var ui = require('./ui/uiRoutes');
var keys = require('./config/keys');
var passport = require('passport');
require('./config/passport-setup');
var authRoutes = require('./auth/routes');
var mongoose = require('mongoose');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var methodOverride = require('method-override');
Grid.mongo = mongoose.mongo;

const crypto = require('crypto');
var multer = require('multer');
var path = require('path');

// Connect to mongoose
var dbUrl = process.env.MONGOLAB_CHARCOAL_URI || keys.mongodb.dbURL;
mongoose.connect(dbUrl, { useNewUrlParser: true });
var conn = mongoose.connection;

conn.once('open', function () {

    // Init stream
    var gfs = Grid(conn.db);
    gfs.collection('pictures'); // collection name

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

    var upload = multer({ storage: storage });

    app.post('/images', upload.single('file'), (req, res) => { //upload more bit kot del middlewara ne pa znotrej funkcije.
        res.json({file: req.file});
    });

    app.get('/images/all', (req, res) => {
        gfs.files.find().toArray((err, files) => {
            // check if files
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: 'No files exist'
                });
            }

            //files exist
            return res.json(files);
        })
    })

    app.get('/images/all/:filename', (req, res) => {
        gfs.files.findOne({filename: req.params.filename}, (err, file) => {
            console.log('filename PARAM', req.params.filename);

            // check if files
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exist'
                });
            }

            //files exist
            return res.json(file);
        })
    })

    app.get('/images/:filename', (req, res) => {
        gfs.files.findOne({ filename: req.params.filename}, (err, file) => {
            console.log('ID PARAM', req.params.filename);
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: 'No file exists'
                });
            }

            if (file.contentType === 'image/jpeg' || file.contentType === 'image/jpg' || file.contentType === 'image/png' || file.contentType === 'img/png') {
                // Read output to browser
                const readstream = gfs.createReadStream(file.filename);
                res.header("Content-Type", "image/png");
                readstream.pipe(res);
            } else {
                res.status(404).json({
                    err: 'Not an image'
                });
            };
        })
    })

    app.put('/images/:filename')

    app.delete('/images/:filename', (req, res) => {
        gfs.remove({ filename: req.params.filename, root: 'pictures' }, (err, file) => {
            console.log(req.params.filename);
            if (err) {
                return res.status(404).json({err: err});
            }
            res.json(file);
        });
    });

    // // Get file information(File Meta Data) from MongoDB
    // app.get('/meta', function (req, res) {
    //     gfs.exist({ filename: db_filename }, function (err, file) {
    //         if (err || !file) {
    //             res.send('File Not Found');
    //         } else {
    //             gfs.files.find({ filename: db_filename }).toArray(function (err, files) {
    //                 if (err) res.send(err);
    //                 res.send(files);
    //             });
    //         }
    //     });
    // });
});


// Set up middleware
middleware.setMiddleware(app);

// Set up the api
app.use('/api', api);

// Set up UI
app.use('/', ui);

// Set up auth
app.use(passport.initialize());
app.use('/auth', authRoutes);

// Serve static files
app.use(express.static('client/public'));

module.exports = app;