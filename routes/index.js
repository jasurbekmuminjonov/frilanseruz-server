const { signupUser, signinUser } = require('../controllers/authController');
const { setUserData, getUser, addItemToPortfolio, removeItemFromPortfolio } = require('../controllers/userController');
const checkUser = require('../middlewares/authMiddleware');
const express = require('express');
const rt = express.Router();

rt.post("/signup", signupUser)
rt.post("/signin", signinUser)
rt.put("/update", checkUser, setUserData)
rt.post("/portfolio", checkUser, addItemToPortfolio)
rt.delete("/portfolio", checkUser, removeItemFromPortfolio)
rt.get("/user", checkUser, getUser)

module.exports = rt;