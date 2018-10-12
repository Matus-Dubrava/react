const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const log = require('debug')('react-stripe-payments:index');
const passport = require('passport');

require('./models/user');
require('./services/passport');

const keys = require('./config/dev');
const authRouter = require('./routes/auth');
const billingRouter = require('./routes/billing');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
    keys.mongodbURI,
    { useNewUrlParser: true },
    () => {
        log(`Connection to database established`);
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

app.use('/auth', authRouter);
app.use('/billing', billingRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: '404 Error. Resource not found.' });
});

app.listen(port, () => {
    log(`Server started listening on port ${port}`);
});
