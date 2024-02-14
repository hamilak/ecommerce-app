const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            unique: true,
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
    },
    {
        timestamps: true,
    }
)

const ProductModel = mongoose.model('Products', ProductSchema)

module.exports = ProductModel
