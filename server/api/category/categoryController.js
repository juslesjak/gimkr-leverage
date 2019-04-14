var Category = require('./categoryModel');
var _ = require('lodash');

// finds the category and attaches it to res. object 
// if the :id param was given in query
exports.param = function(req, res, next, id) {
  Category.findOne(id)
  .then(function(category) {
    if(!category) {
    next(new Error('No category found with this id'));
    } else {
    res.category = category;
    next();
    }
  }, function(err) {
    next(err);
  });
};

exports.get = function(req, res, next) {
  Category.find({})
  .then(function(categories){
    res.send(categories);
  }, function(err) {
      next(err);
  });
}

exports.getOne = function(req, res, next) {
  var category = req.category;
  res.json(category);
}

exports.post = function(req, res, next) {
  var newCategory = new Category(req.body);
  newCategory.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.put = function(req, res, next) {
  var category = req.user;
  var newCategory = req.body;

  _.merge(user, newCategory);
  user.save(function(err, saved) {
    if(err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.delete = function(req, res, next) {
  var category = req.category;
  category.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};