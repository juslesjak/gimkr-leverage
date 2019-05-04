// do CRUD & interact with db

var User = require('./userModel');
var _ = require('lodash');

// get :data.name from url query
exports.params = function(req, res, next, name) {
    User.findOne({"data.name": name})
    .populate({
        path: 'data.categories',
    })
        .then(function(user) {
      if (!user) {
        console.log('no user found :(');
        next(new Error('No user found with this name'))
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

  // oba sta undefined
  // zbrije jih checkUser
  console.log("TOLE JE REQ.USER: " + user);
  console.log("TOLE JE REQ.BODY: " + update);


  // merge the updated object onto user
  _.merge(user, update);

  //tuki je user undefined
  // console.log("TOLE JE UPDATED USER: " + user);

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


