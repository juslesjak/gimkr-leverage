// do CRUD & interact with db

var User = require('./userModel');
var _ = require('lodash');

// get :id from url query
exports.params = function(req, res, next, id) {
  User.findById(id)
  .then(function(user) {
    if (!user) {
      next(new Error('No user found with this id'))
    } else {
      res.user = user;
      next();
    }
  }, function(err) {
    next(err);
  })
}

exports.get = function(req, res, next) {
  User.find({})
  .then(function(users){
    res.send(users);
  }, function(err) {
    next(err);
  });
};

exports.getOne = function(req, res, next) {
  var user = req.user;
  res.json(user);
}

exports.post = function(req, res, next) {
  var newUser = new User(req.body)

  newUser.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      // kle rabs se dodelit auth token in mu ga nazaj vrnt namest celga saved objecta.
      res.json(saved);
    }
  });
};

exports.put = function(req, res, next, id) {
  var user = req.user;
  var update = req.body;

  // merge the updated object onto user
  _.merge(user, update);

  // update db
  user.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.delete = function(req, res, next) {
  var user = req.user;

  user.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};


