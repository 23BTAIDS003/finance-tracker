import React from 'react';

function ExpenseSummary({ summary }) {
  return (
    <div>
      <h2>Summary</h2>
      <p>Total Expenses: ${summary.total}</p>
      <h3>Expenses by Category</h3>
      <ul>
        {Object.keys(summary.byCategory).map((category) => (
          <li key={category}>
            {category}: ${summary.byCategory[category]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseSummary;