const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
