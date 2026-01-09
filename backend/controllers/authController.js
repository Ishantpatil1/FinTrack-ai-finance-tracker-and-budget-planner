const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

// Token generator with guard for missing secret
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Register user
module.exports.registerUser = async (req, res) => {
    try {
        // Validate environment
        if (!process.env.JWT_SECRET) {
            console.error('CRITICAL: JWT_SECRET not configured');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const { name, email, password } = req.body || {};

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Check database connection
        const mongoose = require('mongoose');
        if (mongoose.connection.readyState !== 1) {
            console.error('Database not connected. State:', mongoose.connection.readyState);
            return res.status(503).json({ message: 'Database connection unavailable' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const user = await User.create({ name, email, password });
        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (err) {
        console.error('Register error:', err?.stack || err);
        return res.status(500).json({ 
            message: 'Server error during registration',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// Login user
module.exports.loginUser = async (req, res) => {
    try {
        // Validate environment
        if (!process.env.JWT_SECRET) {
            console.error('CRITICAL: JWT_SECRET not configured');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check database connection
        const mongoose = require('mongoose');
        if (mongoose.connection.readyState !== 1) {
            console.error('Database not connected. State:', mongoose.connection.readyState);
            return res.status(503).json({ message: 'Database connection unavailable' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (err) {
        console.error('Login error:', err?.stack || err);
        return res.status(500).json({ 
            message: 'Server error during login',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// Get user profile
module.exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching profile' });
    }
};
