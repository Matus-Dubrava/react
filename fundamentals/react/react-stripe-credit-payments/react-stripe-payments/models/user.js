const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: {
        type: String,
        unique: true,
        required: true
    },
    credit: {
        type: Number,
        default: 0
    }
});

mongoose.model('users', userSchema);
