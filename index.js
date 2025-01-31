const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenses');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/finance-tracker')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Use expense routes
app.use('/', expenseRoutes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});