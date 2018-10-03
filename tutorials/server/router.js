const router = require('express').Router();

router.get('/', (req, res) => {
    res.json(['water', 'bottle', 'phone', 'paper']);
});

module.exports = router;