import React, { useState } from "react";

import ManageAccounts from "./components/ManageAccounts";
import AddExpense from "./components/AddExpense";
import ExpenseHistory from "./components/ExpenseHistory";
import ExpenseChart from "./components/ExpenseChart";

const App = () => {
  const [balance, setBalance] = useState(20000);
  const [expenses, setExpenses] = useState([]);
  //i was thinking to bring balance and expense to store in same array because
  //dont wanna change anything at balance if i do have to change much code and i have to make more
  return (
    <>
      <ManageAccounts
        balance={balance}
        setBalance={setBalance}
        setExpenses={setExpenses}
      />
      <div className="flex w-full h-[65vh] gap-2 px-5">
        <div className="w-1/3">
          <ExpenseHistory expenses={expenses} />
        </div>

        <div
          className="flex w-2/3 border h-full gap-8 justify-center items-center
"
        >
          <AddExpense setBalance={setBalance} setExpenses={setExpenses} />
          <ExpenseChart expenses={expenses} />
        </div>
      </div>
    </>
  );
};

export default App;
