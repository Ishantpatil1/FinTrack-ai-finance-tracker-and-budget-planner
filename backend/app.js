const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const budgetRoutes = require('./routes/budgetRoutes')


dotenv.config(); 
const port = process.env.PORT;

main().then(() => {
    console.log("Successfully Connected to Database");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
};

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', transactionRoutes);
app.use('/api/budget', budgetRoutes);


app.get("/api", (req, res) => {
    res.json({ message: "Welcome to Smart Finance API 🚀" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});