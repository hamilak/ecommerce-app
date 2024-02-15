const Product = require('../models/products')

// create new product
exports.create = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ message: 'Body can not be empty' })
        }
        const existingProduct = await Product.findOne({
            email: req.body.productName,
        })
        if (existingProduct) {
            res.status(409).send({ message: 'Product already exists' })
        }
        const product = new Product({
            productName: req.body.productName,
            type: req.body.type,
            price: req.body.price,
            quantity: req.body.quantity,
        })
        const savedProduct = await product.save()

        res.status(201).send(savedProduct)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

// get all products
exports.getAll = async (req, res) => {
    try {
        const allProducts = await Product.find({})
        res.status(200).send(allProducts)
    } catch (error) {
        res.send(error)
    }
}

exports.getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).send(product)
    } catch (error) {
        
    }
}

// update product
exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const product = await findProduct(id)

        if (req.body.productName) {
            product.productName = req.body.productName
        }
        if (req.body.type) {
            product.type = req.body.type
        }
        if (req.body.quantity) {
            product.quantity = req.body.quantity
        }

        const updatedProduct = await product.save()
        res.send({ message: 'product deleted:', product: updatedProduct })
    } catch (error) {
        res.send(error)
    }
}

// delete product
exports.delete = async (req, res) => {
    try {
        const id = req.params.id
        const product = await findProduct(id)
        const deleteProduct = await Product.deleteOne(product)
        res.send({ message: 'product deleted:', deleteProduct })
    } catch (error) {
        console.log(error)
    }
}

const findProduct = async (id) => {
    try {
        const product = await Product.findById(id)
        if (!product) {
            throw new Error('Product does not exist')
        }
        return product
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
