const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
var User = require('../api/user/userModel');


var googleConfig = {
    clientID: '2285976511-mm4jb2mngdktvkq9g8l7n01n5m1m1qfp.apps.googleusercontent.com',
    clientSecret: 'rsMVVHn6xR_AS88TTIklixAd',
    callbackURL: '/auth/google/callback',
}

// Passport strategy (auth.googleStrategy)
passport.use(
    new GoogleStrategy(
        googleConfig, 
        (accessToken, refreshToken, profile, done) => {

            User.findOne({"google.id": profile.id})
                .then(
                    function(user) {
                        if(user) {
                            // Return existing user
                            console.log('User already exists', profile);
                            done(null, user);
                            
                        } else {

                            // Create new user
                            var email = profile.emails[0].value;
                            var newUser = {
                                data: {
                                    firstName: profile.name.givenName,
                                    lastName: profile.name.familyName,
                                    categories: [],
                                },
                                google: {
                                    id: profile.id,
                                    email: email
                                }
                            }

                            var newMongoUser = new User(newUser);

                            console.log('mongoUser to be saved:', newMongoUser);

                            newMongoUser.save(function(err, savedUser) {
                                if (err) {
                                    return done(err);
                                }
                            }).then((savedUser) => {
                                console.log('Saved user: ' + savedUser);
                            })
                        }
                    }, function(err) {
                        if(err) { return done(err); };
                    }
                )
            done(null, profile);
                }
            )
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({'google.id':id})
        .then(function(user) {
            done(null, user)
        })
});