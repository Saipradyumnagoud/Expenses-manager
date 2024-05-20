import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <ul>
      {expenses.map((expense) => (
        <li key={expense._id}>
          {expense.category}: ${expense.amount}
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
