var Category = require('./categoryModel');
var _ = require('lodash');

// finds the category and attaches it to res. object 
// if the :id param was given in query
exports.param = function(req, res, next, id) {
  
  // localhost:3000/api/categories/5d4dd804dc311c314c809f46
  Category.findOne({"_id" : id})
  .populate('users')
  .then(function(category) {
    if(!category) {
    next(new Error('No category found with this id', id));
    } else {
    req.category = category;
    next();
    }
  }, function(err) {
    next(err);
  });
};

exports.get = function(req, res, next) {
  Category.find({})
  .populate('users')
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
  console.log(req.body);
  var newCategory = new Category(req.body);
  newCategory.save(function(err, savedCategory) {
    if (err) {
      next(err);
    } else {
      res.json(savedCategory);
    }
  });
};

exports.put = function(req, res, next) {
  var category = req.category;
  var newCategory = req.body;

  _.merge(category, newCategory);
  category.save(function(err, saved) {
    if(err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.delete = function(req, res, next) {
  req.category.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};