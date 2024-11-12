import React from 'react';

function ExpanseList({ curr, handleDelete }) {
  // Conditional class based on whether amount is income (positive) or expense (negative)
  const itemClass = curr.amount >= 0 ? 'income' : 'expense';

  return (
    <li className={`Expanse-item ${itemClass}`}>
      <div className="Expanse-details">
        <span className="Expanse-text">{curr.text}</span>
        <span className="Expanse-category">{curr.category}</span>
        <span className="Expanse-amount">{curr.amount >= 0 ? `+${curr.amount}` : `${curr.amount}`}</span>
      </div>
      <button className="delete-btn" onClick={() => handleDelete(curr.id)}>Delete</button>
    </li>
  );
}

export default ExpanseList;
