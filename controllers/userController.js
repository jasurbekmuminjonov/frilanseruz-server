const User = require('../models/userModel');

exports.setUserData = async (req, res) => {
    const { user_id } = req.user;

    try {
        const user = await User.findByIdAndUpdate(user_id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ message: 'Аккаунт не найден' });
        }
        res.status(200).json({ message: 'Изменения сохранены' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'На сервере произошла ошибка' });
    }
};

exports.getUser = async (req, res) => {
    const { user_id } = req.user;
    try {
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Аккаунт не найден' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'На сервере произошла ошибка' });
    }
};

exports.addItemToPortfolio = async (req, res) => {
    try {
        const { user_id } = req.user;
        const user = await User.findByIdAndUpdate(user_id, {
            $push: { portfolio: req.body }
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Аккаунт не найден' });
        }
        res.status(200).json({ message: 'Портфолио обновлено' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'На сервере произошла ошибка' });
    }
}
exports.updatePortfolioItem = async (req, res) => {
    try {
        const { user_id } = req.user;
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Аккаунт не найден' });
        }

        const updatingItem = user.portfolio.find((item) =>
            item._id == req.params.item_id
        );
        if (!updatingItem) {
            return res.status(404).json({ message: 'Элемент портфолио не найден' });
        }
        Object.assign(updatingItem, req.body);
        await user.save();
        res.status(200).json({ message: 'Портфолио обновлено' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'На сервере произошла ошибка' });
    }

}

exports.removeItemFromPortfolio = async (req, res) => {
    try {
        const { user_id } = req.user;
        const user = await User.findByIdAndUpdate(user_id, {
            $pull: { portfolio: { _id: req.params.item_id } }
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Аккаунт не найден' });
        }
        res.status(200).json({ message: 'Портфолио обновлено' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'На сервере произошла ошибка' });
    }
}
exports.getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'Аккаунт не найден' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'На сервере произошла ошибка' });
    }
}

exports.checkUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            return res.status(400).json({ message: 'Имя пользователя занято', isTaken: true });
        }
        res.status(200).json({ message: 'Имя пользователя не занято', isTaken: false });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'На сервере произошла ошибка' });
    }
}