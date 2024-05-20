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
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Middleware
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Expense Manager');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
