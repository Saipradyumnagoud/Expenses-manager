const express = require('express');
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/auth'); // Assuming you have a middleware for JWT authentication

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
    const { category, amount } = req.body;
    const userId = req.user._id;

    try {
        const expense = new Expense({ userId, category, amount });
        await expense.save();
        res.status(201).send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId });
        res.send(expenses);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
