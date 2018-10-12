const router = require('express').Router();
const keys = require('../config/dev');
const stripe = require('stripe')(keys.stripeSecretKey);

const requireLogin = require('../middleware/requireLogin');

router.post('/charge', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '5$ for 5 credit',
        source: req.body.token.id
    });

    req.user.credit += 5;
    const updatedUser = await req.user.save();
    res.json(updatedUser);
});

module.exports = router;
