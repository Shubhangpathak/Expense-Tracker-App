import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddExpense = ({ setBalance, setExpenses }) => {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("None");
  const [expenseDate, setExpenseDate] = useState("01/08/2025");

  const handleAddExpense = () => {
    setBalance((prevBalance) => prevBalance - Number(expenseAmount));
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        type: "expense",
        date: expenseDate,
        category: selectedCategory,
        amount: -Number(expenseAmount),
      },
    ]);
    setExpenseAmount("");
    setSelectedCategory("None");
    setExpenseDate("01/08/2025");
  };
  const handleReset = () => {
    setExpenseAmount("");
    setSelectedCategory("None");
    setExpenseDate("01/08/2025");
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
      <div className="flex flex-col gap-5 w-sm">
        <h3>AddExpense</h3>
        <span className="flex flex-col">
          <span className="text-gray-400">Amount</span>
          <input
            className="border px-6 py-3 remove-arrow rounded-3xl w-full"
            type="number"
            id="expense"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
        </span>
        <div className="relative">
          <span className="flex flex-col">
            <span className="text-gray-400">Category</span>
            <select
              className="border px-6 py-3 remove-arrow rounded-3xl w-full appearance-none "
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
        </div>
        <span className="flex flex-col">
          <span className="text-gray-400">Date</span>
          <DatePicker
            selected={expenseDate}
            onChange={(date) => setExpenseDate(date)}
            className="border px-6 py-3 remove-arrow rounded-3xl w-full"
            showYearDropdown
            // dateFormatCalendar="MMMM"
            // yearDropdownItemNumber={15}
            scrollableYearDropdown
          />
        </span>

        <div className="flex gap-5">
          <button
            className=" px-6 border  py-3 remove-arrow rounded-3xl clr-ruby"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="clr-emerald  px-8 py-4 rounded-3xl"
            onClick={handleAddExpense}
          >
            Add Expense
          </button>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
