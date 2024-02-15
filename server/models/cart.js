const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema(
    {
        quantity: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }]
    },
    {
        timestamps: true,
    }
)

const CartModel = mongoose.model('Cart', CartSchema)

module.exports = CartModel
