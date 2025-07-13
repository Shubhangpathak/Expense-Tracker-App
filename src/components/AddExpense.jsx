import React from "react";

const AddExpense = () => {
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
          <input className="border px-4 py-2" type="number" />
        </span>
        <span className="flex flex-col">
          <span>Category</span>
          <select className="border px-4 py-3">
            <option key="None" value="None">
              {" "}
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
          <input type="date" className="border px-4 py-2" />
        </span>

        <div className="flex gap-5">
          <button className="border px-4 py-2">
            <img src="/reset1.svg" alt="resets-value" className="h-7" />
          </button>
          <button className="border px-8 py-2">Add Expense</button>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
