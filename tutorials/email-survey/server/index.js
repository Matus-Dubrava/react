const express = require('express');
const log = require('debug')('server:index');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/user');
require('./services/passport');
const authRouter = require('./routes/auth');
const app = express();
const port = process.env.PORT || 5000;
const keys = require('./config/keys');

mongoose.connect(
    keys.mongodbURI,
    { useNewUrlParser: true },
    () => {
        log('Connection to database established.');
    }
);

app.use((req, res, next) => {
    log(`${req.method} - ${req.url}`);
    next();
});

app.use(bodyParser.json());
app.use(cors());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.listen(port, () => {
    log(`Servers started listening on port ${port}`);
});
