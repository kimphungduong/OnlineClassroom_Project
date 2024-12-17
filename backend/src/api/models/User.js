// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    secretKey: {
        type: String,
        default: null,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Cho phép giá trị null
      },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        default: 'student'
    },
    refreshToken: {
        type: String,
        default: null
    },

});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
