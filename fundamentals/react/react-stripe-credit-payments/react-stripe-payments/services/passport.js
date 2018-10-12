const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');
const keys = require('../config/dev');

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (err) {
        return done(err);
    }
});

const googleOptions = {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: keys.googleRedirectURL,
    proxy: true
};

const googleLogin = new GoogleStrategy(
    googleOptions,
    async (accessToken, refreshToken, profile, done) => {
        console.log('INSIDE OF PASSPORT FUNCTION');
        try {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            }

            const newUser = await new User({ googleId: profile.id }).save();
            return done(null, newUser);
        } catch (err) {
            return done(err);
        }
    }
);

passport.use(googleLogin);
