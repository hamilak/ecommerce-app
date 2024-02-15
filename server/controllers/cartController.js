const Cart = require('../models/cart')
const User = require('../models/user')
const Product = require("../models/products")
// const mo

// add to cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.params.userId
        const productId = req.params.id
        console.log(userId)
        console.log(productId)
        if (!userId || !productId) {
            return res.status(400).send({ message: 'User id and product id are required' })
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).send({ message: 'No user' })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(400).send({ message: 'No product' })
        }
        let cart = await Cart.findOne({ user: userId })
        if (!cart) {
            cart = new Cart({ user: userId, products: [], quantity: 1 })
        }
        // const existingProduct = cart.products.find(prod => prod.equals(productId))
        // console.log(existingProduct)
        // if (existingProduct) {
        //     existingProduct.quantity += 1;
        // } else {
            cart.products.push(productId)
        // }
        await cart.save()
        res.status(201).send(cart)
    } catch (error) {
        console.log('Error:', error)
    }
}

exports.getCart = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)
        console.log(user)
        if(!user){
            return res.status(400).send({ message: 'User does not exist' })
        }
        const cart = await Cart.findOne({ user: userId })
        if(!cart){
            return res.status(404).send({ message: 'No cart for this user' })
        }
        const products = cart.products
        const productDetails = {}
        for (let index = 0; index < products.length; index++) {
            const productId = products[index];
            const product = await Product.findById(productId)
            console.log(productId)
            if (product) {
                let quantity = 1
                if (productId in productDetails) {
                    quantity = productDetails[productId].quantity + 1;
                    productDetails[productId].quantity = quantity;
                }
                if (!productDetails[productId]) {
                    productDetails[productId] = {
                        id: product._id,
                        productName: product.productName,
                        type: product.type,
                        price: product.price,
                        quantity: quantity
                    };
                }
            }
        }
        const productList = Object.values(productDetails);
        console.log(productList)
        res.status(200).send(productList)
    } catch (error) {
        console.log(error)
    }
}
