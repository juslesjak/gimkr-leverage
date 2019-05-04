var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    // required: true,
    unique: true
  },
    // link via objectIds
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }]
})

module.exports = mongoose.model('category', CategorySchema);


// type: Schema.Types.ObjectId,
// ref: 'user',