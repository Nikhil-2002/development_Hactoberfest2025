function ExpenseItem({ expense, onDelete }) {
  const isPositive = expense.amount >= 0;
  return (
    <li className={"expense-item " + (isPositive ? "income" : "expense")}>
      <span>{expense.description}</span>
      <span>{isPositive ? "+" : ""}₹{expense.amount}</span>
      <button className="delete-btn" onClick={() => onDelete(expense.id)}>🗑️</button>
    </li>
  );
}
export default ExpenseItem;
