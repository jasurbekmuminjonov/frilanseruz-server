const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signupUser = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ user_id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
            return res.status(200).json({ message: "Вход успешен", token, username: existingUser.username })
        }
        const user = await userModel.create({ email });
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(201).json({ message: "Аккаунт успешно создан", token });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}

exports.signinUser = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'Аккаунт с email не найден' })
        }
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).json({ message: "Вход успешен", token })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


