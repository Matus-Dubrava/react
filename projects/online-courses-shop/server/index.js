const express = require('express');
const mongoose = require('mongoose');
const log = require('debug')('server:index');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/user');
require('./services/passport');

const keys = require('./config');

const app = express();
const port = process.env.PORT || 5000;
const baseAPIUrl = '/api/v1';
const authRouter = require('./routes/auth');

mongoose.connect(
    keys.mongodbURI,
    { useNewUrlParser: true },
    () => {
        log(`Connection to database established.`);
    }
);

app.use((req, res, next) => {
    log(`${req.method} - ${req.url}`);
    next();
});

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(baseAPIUrl + '/auth', authRouter);

app.use((req, res, next) => {
    res.status(404).json('404 Error. Resource not found.');
});

app.listen(port, () => {
    log(`Servers started listening on port ${port}`);
});
