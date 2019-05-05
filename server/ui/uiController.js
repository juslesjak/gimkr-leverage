var _ = require('lodash');
var path = require('path')
var User = require('../api/user/userModel');

// get :data.name from url query
exports.params = function(req, res, next, name) {
    User.findOne({"data.name": name})
    .populate({
        path: 'data.categories',
    })
        .then(function(user) {
      if (!user) {
        console.log('no user found :(');
        next(new Error('No user found with this name: ' + typeof(name)))
      } else {
        req.user = user;
        next();
      }
    }, function(err) {
      next(err);
    })
  }

exports.getLogin = function(req, res) {
    res.sendFile(path.join(__dirname + '/../../public/login.html'));
};

exports.getHome = function(req, res) {
    res.sendFile(path.join(__dirname + '/../../public/home.html'));
};

exports.getOne = function(req, res) {
    res.sendFile(path.join(__dirname + '/../../public/profile.html'));
}

exports.postUser = function(req, res, next) {
    res.sendFile(path.join(__dirname + '/../../public/profileCreate.html'));
};

exports.put = function(req, res, next) {
    res.sendFile(path.join(__dirname + '/../../public/profileEdit.html'));
};

// delete user from db (nothing else needed because all static files are generated sproti React)) KAJ PA SLIKE?
exports.delete = function(req, res, next) {
    res.send('kao deleted a user');
//   var user = req.user;

//   user.remove(function(err, removed) {
//     if (err) {
//       next(err);
//     } else {
//       res.json(removed);
//     }
//   });
};


