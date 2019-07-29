var User = require('../api/user/userModel');
var config = require('../config/config');
var passport = require('passport');

exports.googleStrategy = function(accessToken, refreshToken, profile, done) {
    console.log('AUTHENTICATED WITH GOOGLE');
    User.findOne({"google.id": profile.id})
        .then(
            function(user) {
                if(user) {
                    // Return existing user
                    done(null, user);
                } else {
                    // Create new user
                    var email = profile.emails[0].value;
                    var newUser = {
                        data: {
                            name: profile.displayName,
                            categories: [],
                        },
                        google: {
                            id: profile.id,
                            email: email
                        }
                    }

                    var newMongoUser = new User(newUser);

                    newMongoUser.save(function(err, savedUser) {
                        if (err) {
                            return done(err);
                          } else {
                              console.log('SAVED USEEEEEER: ', savedUser);
                            done(null, savedUser);
                          }
                    })
                }
            }, function(err) {
                if(err) { return done(err); };
            }
        )
    done(null, profile);
}
