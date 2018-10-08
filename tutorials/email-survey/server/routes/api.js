const router = require('express').Router();

router.get('/logout', (req, res) => {
    req.logout();
    res.json(req.user);
});

router.get('/current_user', (req, res) => {
    res.json(req.user);
});

module.exports = router;
