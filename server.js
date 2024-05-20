const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');

// Initialize Express
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/expense-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to Expense Manager');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
