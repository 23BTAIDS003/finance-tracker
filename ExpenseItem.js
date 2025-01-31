import React, { useState } from 'react';

function ExpenseItem({ id, title, amount, date, category, onDeleteExpense, onEditExpense }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedAmount, setEditedAmount] = useState(amount);
  const [editedDate, setEditedDate] = useState(date);
  const [editedCategory, setEditedCategory] = useState(category);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEditExpense(id, { title: editedTitle, amount: editedAmount, date: editedDate, category: editedCategory });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
          />
          <input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
          <input
            type="text"
            value={editedCategory}
            onChange={(e) => setEditedCategory(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{title}</h3>
          <p>Amount: ${amount}</p>
          <p>Date: {new Date(date).toLocaleDateString()}</p>
          <p>Category: {category}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onDeleteExpense(id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default ExpenseItem;