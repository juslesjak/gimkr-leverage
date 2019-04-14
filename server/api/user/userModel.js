var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    name: {
      type: String,
      required: true,
      unique: true
    }
  }
})

// export the model. Instances of this model will
// be created according to the blueprint UserSchema
// and saved in mongoDB under collection 'user'
module.exports = mongoose.model('user', UserSchema);