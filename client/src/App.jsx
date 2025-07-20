import React, { useState } from "react";

import ManageAccounts from "./components/ManageAccounts";
import AddExpense from "./components/AddExpense";
import ExpenseHistory from "./components/ExpenseHistory";
import ExpenseChart from "./components/ExpenseChart";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const Home = () => {
  const [balance, setBalance] = useState(20000);
  const [expenses, setExpenses] = useState([]);

  return (
    <>
      <ManageAccounts
        balance={balance}
        setBalance={setBalance}
        setExpenses={setExpenses}
      />
      <div className="flex flex-col sm:flex-row w-full h-[65vh] gap-2 px-5 ">
        <div className="w-1/3">
          <ExpenseHistory expenses={expenses} />
        </div>

        <div className="flex w-2/3 border h-full gap-8 justify-center items-center">
          <AddExpense setBalance={setBalance} setExpenses={setExpenses} />
          <ExpenseChart expenses={expenses} />
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
};

export default App;
