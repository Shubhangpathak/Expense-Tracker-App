import React, { useState } from "react";

import ManageAccounts from "./components/ManageAccounts";
import AddExpense from "./components/AddExpense";
import ExpenseHistory from "./components/ExpenseHistory";

const App = () => {
  const [balance, setBalance] = useState(20000);
  const [expense, setExpense] = useState([]);
  return (
    <>
      <ManageAccounts balance={balance} setBalance={setBalance} />
      <div className="flex justify-center gap-5">
        <AddExpense setBalance={setBalance} />
        <ExpenseHistory />
      </div>
    </>
  );
};

export default App;
