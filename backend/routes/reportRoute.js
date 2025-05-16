const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../models/user.js');
const Transaction = require('../models/transaction.js');
const generateTransactionReport = require('../utils/generateTransactionReport');
const { sendReportEmail } = require('../utils/emailService');
const { verifyToken } = require('../middleware/authMiddleware.js');

router.post('/transaction-report', verifyToken, async (req, res) => {
    try {
        const { range, startDate, endDate, sendTo } = req.body;

        console.log("🔍 Requested range:", range);
        console.log("🧪 Custom Dates:", startDate, endDate);

        const user = await User.findById(req.userId);
        if (!user) {
            console.log("❌ User not found for ID:", req.userId);
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("👤 Found User:", user.email);

        let start, end;
        const today = new Date();

        switch (range) {
            case 'weekly':
                start = new Date(today.setDate(today.getDate() - 7));
                end = new Date();
                break;
            case 'monthly':
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                end = new Date();
                break;
            case 'yearly':
                start = new Date(today.getFullYear(), 0, 1);
                end = new Date();
                break;
            case 'custom':
                if (!startDate || !endDate) {
                    console.log("⚠️ Missing custom range values");
                    return res.status(400).json({ message: 'Custom range requires startDate and endDate' });
                }
                start = new Date(startDate);
                end = new Date(endDate);
                break;
            default:
                console.log("⚠️ Invalid range type provided:", range);
                return res.status(400).json({ message: 'Invalid range type' });
        }

        console.log(`📆 Date Range: ${start.toISOString()} to ${end.toISOString()}`);

        const transactions = await Transaction.find({
            userId: req.userId,
            date: { $gte: start, $lte: end }
        });

        if (!transactions.length) {
            console.log("📭 No transactions found in the selected range.");
            return res.status(404).json({ message: 'No transactions found for the selected range' });
        }

        console.log(`✅ Found ${transactions.length} transactions.`);

        const filePath = path.join(__dirname, `../reports/transaction_report_${Date.now()}.pdf`);
        console.log("📁 Generating report at:", filePath);
        await generateTransactionReport(transactions, filePath, range);

        console.log("📨 Sending email to:", user.email);
        const recipientEmail = sendTo || user.email;
        await sendReportEmail(recipientEmail, filePath, range);
        console.log("✅ Email successfully sent.");

        res.status(200).json({ message: 'Transaction report sent to email' });

    } catch (err) {
        console.error('🚨 Error in /transaction-report:', err);
        res.status(500).json({ message: 'Error generating report', error: err.message });
    }
});

module.exports = router;
