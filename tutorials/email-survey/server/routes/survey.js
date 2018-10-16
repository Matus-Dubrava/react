const router = require('express').Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

router.get('/surveys', requireLogin, async (req, res) => {
    try {
        const surveys = await Survey.find({ _user: req.user.id }).select({
            recipients: false
        });

        res.json(surveys);
    } catch (err) {
        res.status(500).json('500 Error. Service currenly unavailable.');
    }
});

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
        console.log('HERE');
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

        return res.json(user);
    } catch (err) {
        return res.status(422).json(err);
    }
});

router.get('/surveys/:surveyId/:choice', (req, res) => {
    res.json('Thanks for voting!');
});

// parsing incoming data from sendgrid service
router.post('/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
        .map(({ email, url }) => {
            const match = p.test(new URL(url).pathname);
            if (match) {
                return {
                    email,
                    surveyId: match.surveyId,
                    choice: match.choice
                };
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
                {
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {
                            email: email,
                            responded: false
                        }
                    }
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }
            ).exec();
        })
        .value();

    res.send({});
});

module.exports = router;
