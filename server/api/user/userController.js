// do CRUD & interact with db

//var User = require('./userModel');
var User = require('./userModel');
var _ = require('lodash');

// get :data.id from url query
exports.params = function(req, res, next, id) {
    User.findOne({"_id": id})
    .populate({
        path: 'data.categories',
    })
        .then(function(user) {
      if (!user) {
        res.send('No user found with this id:', id);
        // next(new Error('No user found with this name: ' + typeof(name)))
      } else {
        req.user = user;
        next();
      }
    }, function(err) {
      next(err);
    })
  }

exports.get = function(req, res, next) {
  User.find({})
  .populate({
    path: 'data.categories',
})
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

  newUser.save(function(err, savedUser) {
    if (err) {
      next(err);
    } else {
      res.json(savedUser);
    }
  });
};

exports.put = function(req, res, next) {
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



