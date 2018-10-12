const router = require('express').Router();
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

router.post('/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // create new mongo Survey instance
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

    // create a new mailer instance with appropriate arguments
    // and send it to sendgrid
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

        return res.json(user);
    } catch (err) {
        return res.status(422).json(err);
    }
});

router.get('/surveys/thanks', (req, res) => {
    res.json('Thanks for voting!');
});

module.exports = router;
