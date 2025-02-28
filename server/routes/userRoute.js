const express = require('express')

const {loginUser,registerUser}= require("../controller/userController")

const router = express.Router()

//LOGIN
router.post('/login',loginUser)

//REGISTER
router.post('/register',registerUser)

module.exports = router;