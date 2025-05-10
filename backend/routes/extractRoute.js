const express = require('express');
const router = express.Router();

// Route: POST /extract
router.post('/extract', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  const lowerText = text.toLowerCase();

  // --- Amount Extraction ---
  const amountRegexes = [
    /(?:total(?: amount)?|amount paid|paid|payment|price)[^\d]{0,10}(\d{1,6}(?:\.\d{1,2})?)/i,
    /(?:₹|\$)\s?(\d{1,6}(?:\.\d{1,2})?)/
  ];
  let amount = null;
  for (const regex of amountRegexes) {
    const match = text.match(regex);
    if (match) {
      amount = parseFloat(match[1]);
      break;
    }
  }

  // --- Date Extraction ---
  const dateRegexes = [
  /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/,                        // 12/05/2024
  /\b\d{1,2}(?:st|nd|rd|th)?\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i,         // 1st May
  /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2}(?:st|nd|rd|th)?\b/i,             // May 5th
  /\b\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2,4}\b/i,                    // 12 May 2024
  /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2},?\s\d{2,4}\b/i                   // May 5, 2024
];

  let date = null;
  for (const regex of dateRegexes) {
    const match = text.match(regex);
    if (match) {
      date = match[0];
      break;
    }
  }

  // --- Category Detection ---
  const categories = {
    Food: ['swiggy', 'pizza', 'meal', 'zomato', 'restaurant', 'dine', 'hotel'],
    Shopping: ['flipkart', 'amazon', 'shopping', 'store', 'fashion'],
    Travel: ['uber', 'ola', 'flight', 'train', 'bus', 'ticket'],
    Entertainment: ['netflix', 'hotstar', 'movie', 'cinema'],
    Utilities: ['electricity', 'water bill', 'gas', 'recharge', 'return', 'salary']
  };

  let category = 'Others';
  for (const [cat, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      category = cat;
      break;
    }
  }

  res.json({
    amount: amount || null,
    date: date || new Date().toISOString().slice(0, 10),
    category,
    note: 'Parsed with AI NLP',
    type: 'expense'
  });
});

module.exports = router;
