const User = require('../models/user')
const bcrypt = require("bcrypt")

// create new user
// exports.create = async (req, res) => {
//     try {
//         if (!req.body) {
//             res.status(400).send({ message: 'Body can not be empty' })
//         }
//         const existingUser = await User.findOne({ email: req.body.email })
//         if (existingUser) {
//             res.status(409).send({ message: 'User already exists' })
//         }
//         const user = new User({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: req.body.email,
//         })
//         const savedUser = await user.save()

//         res.status(201).send(savedUser)
//     } catch (error) {
//         console.log(error)
//     }
// }

// get all users

exports.getAll = async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.status(200).send(allUsers)
    } catch (error) {
        console.log(error)
    }
}

// update user
exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const user = await findUser(id)

        if (req.body.firstName) {
            product.firstName = req.body.firstName
        }
        if (req.body.lastName) {
            product.lastName = req.body.lastName
        }

        const updatedProduct = await product.save()
        res.send({ message: 'product deleted:', product: updatedProduct })
    } catch (error) {}
}
// delete user
exports.delete = async (req, res) => {
    try {
        console.log(req)
        const id = req.params.id
        const user = await User.findById(id)
        console.log(user)
        if (!user) {
            res.status(404).send({ message: 'User does not exist' })
        }
        const deleteUser = await User.deleteOne(user)
        res.send({ message: 'user deleted:', deleteUser })
    } catch (error) {
        console.log(error)
    }
}
