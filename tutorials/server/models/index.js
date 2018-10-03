const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/react-test-db', 
    { useNewUrlParser: true }, 
    () => { console.log('Connection to database established.'); }
);

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
});

module.exports = mongoose.model('user', userSchema);