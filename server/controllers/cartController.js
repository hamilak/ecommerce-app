const Cart = require('../models/cart');
const User = require('../models/user');
const Product = require('../models/products');

// add to cart
exports.addToCart = async (req, res) => {
    try {
        const { userId, id } = req.params;
        await getUserAndProduct(userId, id);
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, products: [], quantity: 1 });
        }
        cart.products.push(id);
        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
        console.log('Error:', error);
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send({ message: 'User does not exist' });
        }
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).send({ message: 'No cart for this user' });
        }
        const products = cart.products;
        const productDetails = {};
        for (let index = 0; index < products.length; index++) {
            const productId = products[index];
            const product = await Product.findById(productId);
            console.log(productId);
            if (product) {
                let quantity = 1;
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
                        quantity: quantity,
                    };
                }
            }
        }
        const productList = Object.values(productDetails);
        console.log(productList);
        res.status(200).send(productList);
    } catch (error) {
        console.log(error);
    }
};

exports.removeFromCart = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
        res.status(400).send({
            message: 'User id and product id are required',
        });
    }
};

const getUserAndProduct = async (userId, id) => {
    if (!userId || !id) {
        throw new Error('User id and product id required');
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const product = await Product.findById(id);
    console.log(product);
    if (!product) {
        throw new Error('Product not found');
    }
};
