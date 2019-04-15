var Category = require('./categoryModel');
var _ = require('lodash');

// finds the category and attaches it to res. object 
// if the :id param was given in query
exports.param = function(req, res, next, id) {
  
  // localhost:3000/api/categories/349673946739847639486
  Category.findById(id)
  .then(function(category) {
    if(!category) {
    next(new Error('No category found with this id'));
    } else {
    req.category = category;
    console.log("TOLE JE DOC K GA DOBIM IZ FIND() " + category);
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
  console.log(req.body);
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