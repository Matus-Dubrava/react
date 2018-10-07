const router = require('express').Router();
const passport = require('passport');

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

router.get('/google/redirect', passport.authenticate('google'));

router.get('/logout', (req, res) => {
    req.logout();
    res.json(req.user);
});

router.get('/current_user', (req, res) => {
    res.json(req.user);
});

module.exports = router;
