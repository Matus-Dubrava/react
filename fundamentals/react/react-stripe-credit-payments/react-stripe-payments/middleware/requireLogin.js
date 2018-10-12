module.exports = (req, res, next) => {
    if (!req.user) {
        return res.json({ error: 'You must be logged in!' });
    }

    return next();
};
