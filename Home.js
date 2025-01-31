import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Filter from './Filter';
import { toast } from 'react-toastify';

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, [searchTerm]);

  const fetchExpenses = (category = '') => {
    fetch(`http://localhost:3001/expenses?category=${category}&title=${searchTerm}`)
      .then(response => response.json())
      .then(data => setFilteredExpenses(data));
  };

  const addExpense = (expense) => {
    fetch('http://localhost:3001/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    })
      .then(response => response.json())
      .then(newExpense => {
        setExpenses([...expenses, newExpense]);
        fetchExpenses();
        toast.success('Expense added successfully!');
      });
  };

  const editExpense = (id, updatedExpense) => {
    fetch(`http://localhost:3001/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExpense),
    })
      .then(response => response.json())
      .then(() => {
        fetchExpenses();
        toast.success('Expense updated successfully!');
      });
  };

  const deleteExpense = (id) => {
    fetch(`http://localhost:3001/expenses/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setExpenses(expenses.filter((_, index) => index !== id));
        fetchExpenses();
        toast.success('Expense deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting expense:', error);
        toast.error('Failed to delete expense.');
      });
  };

  const filterExpenses = (category) => {
    fetchExpenses(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <h1>Finance Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <Filter onFilter={filterExpenses} onSearch={handleSearch} />
      <ExpenseList expenses={filteredExpenses} onDeleteExpense={deleteExpense} onEditExpense={editExpense} />
    </div>
  );
}

export default Home;