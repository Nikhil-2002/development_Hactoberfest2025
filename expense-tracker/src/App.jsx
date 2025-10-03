import { useState } from "react";
import data from "./data/dummyData.json";
import BalanceSummary from "./components/BalanceSummary.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import AddExpense from "./components/AddExpense.jsx";

function App() {
  const [expenses, setExpenses] = useState(data);
  const addExpense = e => setExpenses([...expenses, e]);
  const deleteExpense = id => setExpenses(expenses.filter(x => x.id !== id));
  return (
    <div className="container">
      <h1 className="main-title">💸 Expense Tracker</h1>
      <BalanceSummary expenses={expenses} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      <AddExpense onAdd={addExpense} />
    </div>
  );
}
export default App;
