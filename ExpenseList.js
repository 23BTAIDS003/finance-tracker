import React from 'react';
import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  return (
    <div>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet!</p>
      ) : (
        expenses.map((expense, index) => (
          <ExpenseItem
            key={index}
            id={expense._id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            category={expense.category}
            onDeleteExpense={onDeleteExpense}
            onEditExpense={onEditExpense}
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;