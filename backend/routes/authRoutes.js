const express = require('express');
const { registerUser, loginUser, getProfile } = require ('../controllers/authController');
const { protect, verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// router.get('/about', (req, res) => {
//   res.json({
//     appName: 'SmartBudgetAI',
//     description: 'AI-powered personal finance platform that helps you save, spend wisely, and automate your budgeting.',
//     version: '1.0.0',
//   });
// });
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getProfile);


module.exports = router;