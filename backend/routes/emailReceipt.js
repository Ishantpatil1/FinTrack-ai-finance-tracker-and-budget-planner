const path = require('path');
const express = require('express');
const router = express.Router();
const generateReceipt = require('../utils/generateReceipt');
const { sendReceiptEmail } = require('../utils/emailService');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.post('/send-receipt', async (req, res) => {
    console.log("Incoming request body:", req.body);
    const { email, data } = req.body;

    if (!email || !data || !data.amount || !data.date || !data.category) {
        return res.status(400).json({ error: 'Missing required fields: email, amount, date, or category.' });
    }

    const fileName = `receipt-${uuidv4()}.pdf`;
    const filePath = path.resolve(__dirname, '../receipts', fileName);

    try {
        await generateReceipt(data, filePath);
        await sendReceiptEmail(email, filePath, data);

        // Delete the file after sending the email
        fs.unlink(filePath, (err) => {
            if (err) console.error(`Failed to delete receipt file: ${filePath}`, err);
            else console.log(`Temporary receipt deleted: ${filePath}`);
        });

        res.json({ success: true, message: `Receipt sent successfully to ${email}` });
    } catch (error) {
        console.error('Error sending receipt:', error);
        res.status(500).json({ error: 'Failed to send receipt. Please try again later.' });
    }
});

module.exports = router;
