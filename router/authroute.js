const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    try {
        console.log('Register request received:', req.body);
        const { username, password, email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Registration failed: User already exists');
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const newUser = new User({
            username,
            password: bcrypt.hashSync(password, 10),
            email,
        });
        await newUser.save();
        
        // Return user data without password
        const userWithoutPassword = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
        };
        
        console.log('User registered successfully:', userWithoutPassword);
        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log('Login request received:', { email: req.body.email });
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Login failed: User not found');
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            console.log('Login failed: Invalid password');
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Return user data without password
        const userWithoutPassword = {
            _id: user._id,
            username: user.username,
            email: user.email
        };

        console.log('Login successful:', userWithoutPassword);
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;
