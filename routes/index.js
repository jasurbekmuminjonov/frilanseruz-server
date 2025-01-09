const { signupUser, signinUser } = require('../controllers/authController');
const { setUserData, getUser } = require('../controllers/userController');
const checkUser = require('../middlewares/authMiddleware');
const express = require('express');
const rt = express.Router();

rt.post("/signup", signupUser)
rt.post("/signin", signinUser)
rt.put("/update", checkUser, setUserData)
rt.get("/get", checkUser, getUser)

module.exports = rt;