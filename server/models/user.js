const mongoose = require('mongoose')

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
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        // cart: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Cart'
        // }
    },
    {
        timestamps: true,
    }
)

const UserModel = mongoose.model('Users', UserSchema)

module.exports = UserModel
