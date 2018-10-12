const router = require('express').Router();
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

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

    const mailer = new Mailer(survey, surveyTemplate(survey));
});

module.exports = router;
