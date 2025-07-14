import React, { useState } from "react";

const AddExpense = ({ setBalance, setExpenses }) => {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("None");
  const [expenseDate, setExpenseDate] = useState("");

  const handleAddExpense = () => {
    setBalance((prevBalance) => prevBalance - Number(expenseAmount));
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        date: expenseDate,
        category: selectedCategory,
        amount: Number(expenseAmount),
      },
    ]);
    setExpenseAmount("");
    setSelectedCategory("None");
    setExpenseDate("");
  };

  const categories = [
    "Housing / Rent",
    "Utilities",
    "Food & Groceries",
    "Transportation",
    "Shopping",
    "Health & Medical",
    "Entertainment",
    "Education",
    "Communication",
    "Financial Expenses",
    "Personal Care",
    "Miscellaneous",
  ];

  return (
    <>
      <div className="flex flex-col w-100 p-5 border gap-5">
        <h3>AddExpense</h3>
        <span className="flex flex-col">
          <span>Amount</span>
          <input
            className="border px-4 py-2"
            type="number"
            id="expense"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
        </span>
        <span className="flex flex-col">
          <span>Category</span>
          <select
            className="border px-4 py-3"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option key="None" value="None">
              Select Category
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </span>
        <span className="flex flex-col">
          <span>Date</span>
          <input
            type="date"
            className="border px-4 py-2"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </span>

        <div className="flex gap-5">
          <button className="border px-4 py-2">
            <img src="/reset1.svg" alt="resets-value" className="h-7" />
          </button>
          <button className="border px-8 py-2" onClick={handleAddExpense}>
            Add Expense
          </button>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
