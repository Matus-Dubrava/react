const router = require('express').Router();
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');

router.post('/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(recipient => ({
            email: recipient.trim()
        })),
        _user: req.user.id,
        dateSent: Date.now()
    });
});

module.exports = router;
