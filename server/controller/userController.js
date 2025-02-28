const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/userModel.js'); 
const jwt = require("jsonwebtoken");


// Utility function to create a JWT
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }
  
// Register method
const registerUser = async (req, res) => {
    const { email, password,confirmPassword} = req.body;

    try {
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ success: false, message: 'All fields must be filled' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid or missing email' });
        }

        if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 1 })) {
            return res.status(400).json({
                success: false,
                message: 'Password not strong enough. Use at least 8 characters, including uppercase, lowercase, numbers, and symbols.',
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'Email already in use.' });
        }

         
       
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashPassword,role:'user' });
        const user = await newUser.save();

        const token = createToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        })
        .status(200)
        .json({
            success: true,
            message: 'Registration successful',
            user: { id: user._id, email: user.email , role:user.role},
            token
        });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ success: false, message: 'An error occurred while processing your request.' });
    }
};

// Login method
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exist. Please register first.",
            });
        }

        // Check password match
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password. Please try again.',
            });
        }

        const token = createToken(user._id)

        // Set cookie with token
       res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
})
.status(200)
.json({
    success: true,
    message: 'Registration successful',
    user: {
        id: user._id,
        email: user.email,
        role:user.role
    },
    token
});

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({
            success: false,
            message: 'An error occurred while logging in. Please try again later.',
        });
    }
};

module.exports = { registerUser, loginUser };
