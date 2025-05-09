const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Endpoint to get aggregated transaction report by category for a specific user
router.get('/report/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all transactions for the user
    const transactions = await Transaction.find({ userId });

    // Aggregate transactions by category
    const categoryTotals = transactions.reduce((acc, tx) => {
      if (acc[tx.category]) {
        acc[tx.category] += tx.amount;
      } else {
        acc[tx.category] = tx.amount;
      }
      return acc;
    }, {});

    res.json({ categoryTotals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch report data' });
  }
});

module.exports = router;
