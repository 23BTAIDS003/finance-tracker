const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.get('/expenses', async (req, res) => {
  const { category, title } = req.query;
  let query = {};

  if (category) {
    query.category = category;
  }

  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }

  const expenses = await Expense.find(query);
  res.json(expenses);
});

router.post('/expenses', async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.status(201).json(expense);
});

router.put('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedExpense);
});

router.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  await Expense.findByIdAndDelete(id);
  res.status(204).send();
});

router.get('/summary', async (req, res) => {
  const expenses = await Expense.find();
  const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const byCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});
  res.json({ total, byCategory });
});

module.exports = router;