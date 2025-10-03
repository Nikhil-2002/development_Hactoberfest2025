import ExpenseItem from "./ExpenseItem.jsx";
function ExpenseList({ expenses, onDelete }) {
  return (
    <ul className="expense-list">
      {expenses.map(e =>
        <ExpenseItem key={e.id} expense={e} onDelete={onDelete}/>
      )}
    </ul>
  );
}
export default ExpenseList;
