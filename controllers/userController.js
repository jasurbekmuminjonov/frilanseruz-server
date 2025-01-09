const User = require('../models/userModel');

exports.setUserData = async (req, res) => {
    const { user_id } = req.user;

    try {
        const user = await User.findByIdAndUpdate(user_id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ message: 'Hisob topilmadi' });
        }
        res.status(200).json({ message: 'O\'zgarishlar saqlandi', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
    }
};

exports.getUser = async (req, res) => {
    const { user_id } = req.user;
    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Hisob topilmadi' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
    }
};

exports.addItemToPortfolio = async (req, res) => {
    try {
        const { user_id } = req.user;
        const user = await User.findByIdAndUpdate(user_id, {
            $push: { portfolio: req.body }
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Hisob topilmadi' });
        }
        res.status(200).json({ message: 'Portfolio yangilandi' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
    }
}

exports.removeItemFromPortfolio = async (req, res) => {
    try {
        const { user_id } = req.user;
        const user = await User.findByIdAndUpdate(user_id, {
            $pull: { portfolio: { _id: req.params.item_id } }
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Hisob topilmadi' });
        }
        res.status(200).json({ message: 'Portfolio yangilandi' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' });
    }
}