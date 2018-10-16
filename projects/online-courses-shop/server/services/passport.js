const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('users');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false);
                }

                user.comparePassword(password, (err, isMatch) => {
                    if (err) {
                        return done(err);
                    }

                    if (!isMatch) {
                        return done(null, false);
                    }

                    return done(null, user);
                });
            } catch (err) {
                return done(err);
            }
        }
    )
);
