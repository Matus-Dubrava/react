const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

// create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async function(email, password, done) {
    // verify this email and password, call done with the user
    // if it is the correct email and password
    // otherwise, call done with false

    try {
        const user = await User.findOne({ email });
        if (!user) { return done(null, false); }

        //compare passwords - is 'password' equal to user.password?
        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false) }

            return done(null, user);
        });
    } catch (err) {
        return done(err);
    }
});

// setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done) {
    // see if the user ID in the payload exists in our database
    // if it does. call 'done' with that object
    // otherwise, call done without a user object

    try {
        const user = await User.findById(payload.sub);

        if (user) { return done(null, user); }
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);