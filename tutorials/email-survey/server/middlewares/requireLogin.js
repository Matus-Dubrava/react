module.exports = (req, res, next) => {
    if (req.user) {
        return next();
    } else {
        return res.status(403).json({ error: 'You need to log in!' });
    }
};
