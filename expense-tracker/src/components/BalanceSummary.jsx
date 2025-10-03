function BalanceSummary({ expenses }) {
  const bal = expenses.reduce((a, b) => a + b.amount, 0);
  return (
    <div className="balance-box">
      <h2>Current Balance</h2>
      <div className="balance-amount">
        ₹{bal}
      </div>
    </div>
  );
}
export default BalanceSummary;
