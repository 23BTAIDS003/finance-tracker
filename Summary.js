import React, { useState, useEffect } from 'react';
import ExpenseSummary from './ExpenseSummary';

function Summary() {
  const [summary, setSummary] = useState({ total: 0, byCategory: {} });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = () => {
    fetch('http://localhost:3001/summary')
      .then(response => response.json())
      .then(data => setSummary(data));
  };

  return (
    <div>
      <h1>Expense Summary</h1>
      <ExpenseSummary summary={summary} />
    </div>
  );
}

export default Summary;