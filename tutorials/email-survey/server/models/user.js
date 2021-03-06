const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    credits: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('users', userSchema);
