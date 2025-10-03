import { useState } from "react";
function AddExpense({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const submit = e => {
    e.preventDefault();
    if (!description || !amount) return;
    onAdd({ id: Math.random(), description, amount: +amount });
    setDescription("");
    setAmount("");
  };
  return (
    <form className="add-expense-form" onSubmit={submit}>
      <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" required />
      <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" placeholder="Amount (use - for expense)" required />
      <button type="submit">Add</button>
    </form>
  );
}
export default AddExpense;
