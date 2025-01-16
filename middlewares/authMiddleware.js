const jwt = require('jsonwebtoken');

async function checkUser(req, res, next) {
    try {
        const publicPath = ["/signin", "/signup", "/username"];
        const token = req.headers?.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.split(" ")[1]
            : null;
        if (publicPath.includes(req.path)) {
            return next();
        }
        if (!token) {
            return res.status(401).json({ message: 'Токен не предоставлен' });
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Срок действия токена истек' });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Неверный токен' });
        }
        return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
}

module.exports = checkUser;
