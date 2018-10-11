const router = require('express').Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/current_user', (req, res) => {
    res.json(req.user);
});

router.post('/stripe', requireLogin, async (req, res) => {
    // we need to create a charge object and specify
    // the token that we have received from the client

    // token itself is specified by property called - id
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
    });

    req.user.credits += 5;
    const updatedPerson = await req.user.save();

    res.json(updatedPerson);
});

module.exports = router;
