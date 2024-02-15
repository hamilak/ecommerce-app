const User = require("../models/user")
const bcrypt = require("bcrypt")

exports.register = async (req, res, next) => {
    const { firstName, lastName, userName, role, password } = req.body
    if(password.length < 6) {
        return res.status(400).send({ message: "Password is too short" })
    }
    const hashedPass = await bcrypt.hash(password, 10)
    const existingUser = await User.findOne({ userName })
    if(existingUser) {
        return res.status(409).send({ message: "User already registered" })
    }
    try{
        const newUser = await User.create({
            firstName,
            lastName,
            userName,
            role,
            password: hashedPass
        })
        res.status(201).send(newUser)
    }catch(error) {
        console.log(error)
        res.status(401).send({ message: "Unable to register user", error: error.message })
    }
}

exports.login = async () => {
    const { userName, password } = req.body
    try {
        const user = await User.findOne({ userName })
        if(!user) {
            res.status(401).send({ message: "User not found" })
        }
        const passwordMatch = bcrypt.compare(password, user.password)
        if(!passwordMatch){
            res.status(401).send({ message: "Wrong password" })
        }
        res.status(201).send({ message: "Login successful", user })
    } catch (error) {
        res.status(400).send({ message: "An error occured", error: error.message })
    }
}