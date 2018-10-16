const mongoose = require('mongoose');
const { Schema } = mognoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(done) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return done(err);
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return done(err);
            }

            user.password = hash;
            done();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, done) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        return done(err, isMatch);
    });
};

mongoose.model('users', userSchema);
