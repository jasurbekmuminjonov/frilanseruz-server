const { signupUser, signinUser } = require('../controllers/authController');
const { setUserData, getUser, addItemToPortfolio, removeItemFromPortfolio, updatePortfolioItem, getUserByUsername } = require('../controllers/userController');
const checkUser = require('../middlewares/authMiddleware');
const express = require('express');
const rt = express.Router();

rt.post("/signup", signupUser)
rt.post("/signin", signinUser)
rt.put("/update", checkUser, setUserData)
rt.post("/portfolio", checkUser, addItemToPortfolio)
rt.put("/portfolio/:item_id", checkUser, updatePortfolioItem)
rt.delete("/portfolio/:item_id", checkUser, removeItemFromPortfolio)
rt.get("/user", checkUser, getUser)
rt.get("/get/:username", getUserByUsername)

module.exports = rt;