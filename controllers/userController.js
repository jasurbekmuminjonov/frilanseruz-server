const User = require('../models/userModel');

exports.setUserData = async (req, res) => {
    const { user_id } = req.user
    try {
        const user = await User.findByIdAndUpdate(user_id, req.body)
        if (!user) {
            return res.status(404).json({ message: 'Hisob topilmadi' })
        }
        res.status(200).json({ message: 'O\'zgarishlar saqlandi' })

    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err)
    }
}


exports.getUser = async (req, res) => {
    const { user_id } = req.user
    try {
        const user = await User.findById(user_id)
        if (!user) {
            return res.status(404).json({ message: 'Hisob topilmadi' })
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err)
    }
}
