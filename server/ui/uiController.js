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
        console.log('No user found :(');
        next(new Error('Ni najdu userja s tem imenom: ' + name))
      } else {
        req.user = user;
        next();
      }
    }, function(err) {
      next(err);
    })
  }

exports.getLogin = function(req, res) {
    res.sendFile(path.join(__dirname + '/../../client/public/login.html'));
};

exports.getHome = function(req, res) {
    res.sendFile(path.join(__dirname + '/../../client/public/home.html'));
};

exports.getOne = function(req, res) {
    res.sendFile(path.join(__dirname + '/../../client/public/profile.html'));
}

// v temu filu das da posle POST na api/users
exports.postUser = function(req, res, next) {
    res.sendFile(path.join(__dirname + '/../../client/public/profileCreate.html'));
};

// v temu filu das da posle PUT na api/users/Jus%20Lesjak
exports.edit = function(req, res, next) {
    res.sendFile(path.join(__dirname + '/../../client/public/profileEdit.html'));
};

exports.delete = function(req, res, next) {
    console.log('kao deleted a user')
}

exports.logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
}