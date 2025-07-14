import React, { useState } from "react";

import ManageAccounts from "./components/ManageAccounts";
import AddExpense from "./components/AddExpense";
import ExpenseHistory from "./components/ExpenseHistory";

const App = () => {
  const [balance, setBalance] = useState(20000);
  const [expenses, setExpenses] = useState([]);
  return (
    <>
      <ManageAccounts balance={balance} setBalance={setBalance} />
      <div className="flex justify-center gap-5">
        <AddExpense setBalance={setBalance} setExpenses={setExpenses} />
        <ExpenseHistory expenses={expenses} />
      </div>
    </>
  );
};

export default App;
