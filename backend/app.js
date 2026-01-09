const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");
const extractRoute = require('./routes/extractRoute');
const emailReceipt = require('./routes/emailReceipt');
const reportRoute = require('./routes/reportRoute');
const budgetAIRoute = require('./routes/budgetAI');
const questionRoute = require('./routes/questionRoute');

// const bodyParser = require('body-parser');


dotenv.config(); 
const port = process.env.PORT;

// Connect to MongoDB with helpful logging
main().then(() => {
    console.log("Successfully Connected to Database");
}).catch((err) => {
    console.error('Failed to connect to MongoDB:');
    console.error(err && err.stack ? err.stack : err);
    process.exit(1); // Exit if database connection fails
});

async function main() {
    // Validate environment variables
    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL environment variable is not set');
    }
    if (!process.env.JWT_SECRET) {
        console.warn('WARNING: JWT_SECRET not set - authentication will fail');
    }
    
    // Connect using modern defaults (driver options `useNewUrlParser` and
    // `useUnifiedTopology` are deprecated and no longer needed).
    await mongoose.connect(process.env.MONGO_URL);
    
    // Handle connection errors after initial connection
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected');
    });
};

// Health check endpoint to verify DB connection state
app.get('/api/health', (req, res) => {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    const state = mongoose.connection.readyState;
    const isHealthy = state === 1;
    
    res.status(isHealthy ? 200 : 503).json({ 
        dbState: states[state] || state,
        healthy: isHealthy,
        timestamp: new Date().toISOString()
    });
});

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', transactionRoutes);
app.use('/api', reportRoute);
app.use('/api', extractRoute);
app.use('/api', emailReceipt);
app.use('/api', budgetAIRoute);
app.use('/api', questionRoute);
app.use('/api/budget', budgetRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Global error handler (catches thrown errors from routes)
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err?.stack || err);
    const status = err.status || err.statusCode || 500;
    res.status(status).json({ message: err.message || 'Internal server error' });
});


app.get("/api", (req, res) => {
    res.json({ message: "Welcome to Smart Finance API 🚀" });
});

// Global error handler (logs stack traces and returns generic 500)
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err && err.stack ? err.stack : err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});