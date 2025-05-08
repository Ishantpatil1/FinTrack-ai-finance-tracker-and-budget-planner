const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Transaction = require('../models/transaction.js');
const generateFakeTransactions = require('../models/fakeTransactions.js');
const User = require('../models/user.js');
const { verifyToken } = require('../middleware/authMiddleware.js');


// ✅ Fetch transactions with optional filters
router.get('/transaction', verifyToken, async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query;

        const filter = { userId: req.userId };

        if (type) filter.type = type;
        if (category) filter.category = category;
        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const transactions = await Transaction.find(filter).sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).json({ message: 'Error fetching transactions' });
    }
});

// ✅ Generate fake transactions
router.get('/faketransactions', verifyToken, async (req, res) => {
    try {
        const fakeTransactions = generateFakeTransactions(req.userId);
        await Transaction.insertMany(fakeTransactions);
        res.json(fakeTransactions);
    } catch (err) {
        console.error('Error generating fake transactions:', err);
        res.status(500).json({ message: 'Error generating fake transactions', error: err.message });
    }
});

// ✅ Add new transaction
router.post('/addnewtransaction', verifyToken, async (req, res) => {
    try {
        const { amount, category, note, type, date } = req.body;

        const newTransaction = new Transaction({
            userId: req.userId,
            amount,
            category,
            note,
            type,
            date,
        });

        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        console.error('Error adding transaction:', err);
        res.status(500).json({ message: 'Error adding transaction', error: err.message });
    }
});

// ✅ Update Transaction
router.put('/transaction/:id', verifyToken, async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Ensure the transaction belongs to the user making the request
        if (transaction.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'You can only update your own transactions' });
        }

        // Update fields
        transaction.amount = req.body.amount || transaction.amount;
        transaction.category = req.body.category || transaction.category;
        transaction.note = req.body.note || transaction.note;
        transaction.type = req.body.type || transaction.type;
        transaction.date = req.body.date || transaction.date;

        const updatedTransaction = await transaction.save();

        res.json(updatedTransaction);
    } catch (err) {
        console.error('Error updating transaction:', err);
        res.status(500).json({ message: 'Error updating transaction', error: err.message });
    }
});

// ✅ Delete Transaction
router.delete('/transaction/:id', verifyToken, async (req, res) => {
    try {
        const transactionId = req.params.id;
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Ensure the transaction belongs to the user making the request
        if (transaction.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'You can only delete your own transactions' });
        }

        await transaction.deleteOne();
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (err) {
        console.error('Error deleting transaction:', err);
        res.status(500).json({ message: 'Error deleting transaction', error: err.message });
    }
});

module.exports = router;
