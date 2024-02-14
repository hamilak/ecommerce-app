const Cart = require('../models/cart')
const User = require('../models/user')

// add to cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.params.id
        console.log(userId)
        if (!req.body) {
            res.status(400).send({ message: 'Body can not be empty' })
        }
        const existingProduct = await Cart.findOne({
            productName: req.body.productName,
            user: userId,
        })
        if (existingProduct) {
            existingProduct.quantity += 1
            await existingProduct.save()
            return res.status(200).send(existingProduct)
        }
        const user = await User.findById(userId)
        console.log(user)
        if (!user) {
            res.status(400).send({ message: 'No user' })
        }
        const product = new Cart({
            productName: req.body.productName,
            type: req.body.type,
            price: req.body.price,
            quantity: 1,
            // user: user._id
        })
        const savedProduct = await product.save()

        res.status(201).send(savedProduct)
    } catch (error) {
        console.log('Error:', error)
    }
}

// increase quantity count
exports.increaseCount = async (req, res) => {
    try {
        const id = req.params.id
        const product = await findProductInCart(id)
        console.log(product)
        product.quantity += 1
        await Cart.updateOne(product)
        res.status(200).send(product)
    } catch (error) {
        console.log(error)
    }
}

// decrease quantity count
exports.decreaseCount = async (req, res) => {
    try {
        const id = req.params.id
        const product = await findProductInCart(id)
        console.log(product)
        product.quantity -= 1
        await Cart.updateOne(product)
        res.status(200).send(product)
    } catch (error) {
        console.log(error)
    }
}

// remove product from cart
exports.removeFromCart = async (req, res) => {
    try {
        const id = req.params.id
        const product = findProductInCart(id)
        const deleteProduct = await Cart.deleteOne(product)
        res.send({ message: 'product deleted', deleteProduct })
    } catch (error) {
        console.log(error)
    }
}

const findProductInCart = async (id) => {
    try {
        const productInCart = await Cart.findById(id)
        if (!productInCart) {
            throw new Error('Product does not exist')
        }
        return productInCart
    } catch (error) {
        console.log(error)
    }
}
