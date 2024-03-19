const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    const { firstName, lastName, userName, role, password } = req.body;
    if (password.length < 6) {
        return res.status(400).send({ message: 'Password is too short' });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
        return res.status(409).send({ message: 'User already registered' });
    }
    try {
        const newUser = await User.create({
            firstName,
            lastName,
            userName,
            role,
            password: hashedPass,
        });
        res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: 'Unable to register user',
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            res.status(404).send({ message: 'User not found' });
            return;
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch)
        if (!passwordMatch) {
            res.status(401).send({ message: 'Wrong password' });
            return;
        }
        const token = jwt.sign(
            { _id: user?._id, userName: user.userName },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRY }
        )
        console.log(`Token: ${token}`)
        res.status(201).send({ message: 'Login successful', user });
    } catch (error) {
        res.status(400).send({
            message: 'An error occured',
            error: error.message,
        });
    }
};
