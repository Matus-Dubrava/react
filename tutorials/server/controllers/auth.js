const User = require('../models/user');

module.exports.signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).json({ error: 'You must provide both email and password' });
    }

    try {
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(422).json({ error: 'Email is in use' });
        }

        const newUser = await (new User({ email, password }).save());
        res.json({ success: true });
    } catch (err) {
        return next(err);
    }
};
