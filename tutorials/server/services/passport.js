const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const config = require('../config');

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