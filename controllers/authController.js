const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signupUser = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Bu email bilan hisob mavjud' });
        }
        const user = await userModel.create({ email });
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
        res.status(201).json({ message: "Hisob muvaffaqiyatli yaratildi", token });
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
            return res.status(404).json({ message: 'Email bilan hisob topilmadi' })
        }
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
        res.status(200).json({ message: "Hisobga kirish muvaffaqiyatli", token })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


