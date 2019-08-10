var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    data: {
        firstName: {
          type: String,
          required: true
        },   
        lastName: {
            type: String,
            required: true
        },
        categories: [{
          type: Schema.Types.ObjectId,
          ref: 'category',
        }],

        profilePhoto: {
            type: Schema.Types.ObjectId, //isto kokr s kategorijami se ke s slikami zgodi
            ref: 'picture'
        },
        
        socialMedia: [{
            socialMediaType: {
                type: String // "Instagram", "Facebook" ...
            },
            url: {
                type: String
            }
        }],

        bio: {
            type: String
        },
        yesDo: {
            type: String
        },
        noDo: {
            type: String
        },
        portfolio: [{
            projectName: {
                type: String,
            },
            projectDescription: {
                type: String
            }
        }],

        majesty: { // likes
            type: Number
        },

        majesticPeople: [{ // liked people
            type: Schema.Types.ObjectId,
            ref: 'users',
          }]
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

module.exports = mongoose.model('user', User);

// google.id dobis iz POST responsa na oauth/google
// torej to je googlov id. moj mongo bo pa vsakmu
// userju dou se en __id, ObjectId
