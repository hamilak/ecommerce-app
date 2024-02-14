// const mongoose = require("mongoose");

// const User = require("../models/user")

// //create new user
// exports.create = async(req, res) => {
//     try {
//         if(!req.body){
//             res.status(400).send({message: 'Body can not be empty'})
//         }
//         const user = new User({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: req.body.email
//         })
//         const savedUser = await user.save()

//         res.status(201).send(savedUser)
//     } catch (error) {
//         console.log(error)
//     }
// }
