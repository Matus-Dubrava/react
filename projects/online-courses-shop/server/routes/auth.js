const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('users');

router.post(
    '/signup',
    async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json('Missing email and/or password');
        }

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(422).json('Email is alredy taken.');
            }

            await new User({ email, password }).save();
            return next();
        } catch (err) {
            return res
                .status(500)
                .json('Error 500. Service is currently unavailable.');
        }
    },
    passport.authenticate('login'),
    (req, res) => {
        res.json(req.user.email);
    }
);

router.post('/signin', passport.authenticate('local'), (req, res) => {
    res.json(req.user.email);
});

router.get('/signout', (req, res) => {
    req.logout();
    res.json('Logout successful.');
});

router.get('/current_user', (req, res) => {
    res.json(req.user);
});

module.exports = router;
