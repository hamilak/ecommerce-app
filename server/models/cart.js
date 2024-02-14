const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        type: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const CartModel = mongoose.model('Cart', CartSchema)

module.exports = CartModel
