const express = require('express');
const log = require('debug')('server:index');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');
const app = express();
const port = process.env.PORT || 5000;

const googleOptions = {
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
};

const googleLogin = new GoogleStrategy(
    googleOptions,
    (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);
    }
);

passport.use(googleLogin);

app.use((req, res, next) => {
    log(`${req.method} - ${req.url}`);
    next();
});

app.use(bodyParser.json());
app.use(cors());

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get(
    '/auth/google/redirect',
    passport.authenticate('google', {
        successRedirect: '/'
    })
);

app.listen(port, () => {
    log(`Servers started listening on port ${port}`);
});
