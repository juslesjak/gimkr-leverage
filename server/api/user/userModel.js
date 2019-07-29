var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    data: {
        name: {
          type: String,
          required: true
        },

        categories: [{
          type: Schema.Types.ObjectId,
          ref: 'category',
        }],

        profileData: {
            profilePhoto: {
                type: Schema.Types.ObjectId, //isto kokr s kategorijami se ke s slikami zgodi
                ref: 'picture'
            },
            socialMedia: {
                instagram: {
                    type: String
                },
                facebook: {
                    type: String
                },
                google: {
                    type: String
                },
            },
            bio: {
                type: String
            },
            yesDo: {
                type: String
            },
            noDo: {
                type: String
            },
            alreadyDid: {
                type: String
            }
            // alreadyDid: [{
            //     type: Schema.Types.ObjectId,
            //     ref: 'picture'
            // }],
        }
    },

    google: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,
        }
    }
})
module.exports = mongoose.model('user', UserSchema);

// google.id dobis iz POST responsa na oauth/google
// torej to je googlov id. moj mongo bo pa vsakmu
// userju dou se en __id, ObjectId
