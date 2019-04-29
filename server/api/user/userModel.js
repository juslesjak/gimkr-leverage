var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google'],
  },
  local: {
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      unique: true
    },
    data: {
      name: {
        type: String,
        unique: true
      }
    }
  },
  
  google: {
    // ta ID dobis iz POST responsa na oauth/google
    // torej to je googlov id. moj mongo bo pa vsakmu
    // userju dou se en __id, pac ObjectId
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    }
  }
})

// Check which method user used to sign in
// 
UserSchema.pre('save', async function(next) {
  try {
    if (this.method !== 'local') {
      next();
    }

  } catch(error) {
    next(error);
  }
} )


module.exports = mongoose.model('user', UserSchema);