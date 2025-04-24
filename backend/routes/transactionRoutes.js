const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Transaction = require('../models/transaction.js');
const User = require('../models/user.js');

// middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.userId = decoded.id;
        next();
    });
};

router.get('/transaction', verifyToken, async (req, res) => {
    try {

        console.log('UserId from token:', req.userId);
        const transaction = await Transaction.find({ userId: req.userId }).sort({ date: -1 });
        res.json(transaction);
    } catch (err) {
         res.status(500).json({ message: 'Error fetching transactions' });
    }
});

module.exports = router;
