const router = require('express').Router();
const passport = require('passport');

router.get(
    '/google',
    (req, res, next) => {
        console.log('INITIATING GOOGLE OAUTH'), next();
    },
    passport.authenticate('google', {
        scope: ['profile']
    })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

router.get('/current_user', (req, res) => {
    res.json(req.user || false);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
