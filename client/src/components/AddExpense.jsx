import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";

const AddExpense = ({ setBalance, setExpenses }) => {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("None");
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleAddExpense = async () => {
    if (!expenseAmount || selectedCategory === "None") {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/expense",
        {
          amount: expenseAmount,
          category: selectedCategory,
          type: "expense",
          date: expenseDate,
        },
        { headers: getAuthHeader() }
      );

      setBalance(response.data.newBalance);

      fetchExpenses();

      handleReset();
      toast.success("Expense added successfully!");
    } catch (err) {
      console.error("Add expense error:", err);
      toast.error("Failed to add expense. Please try again.");
    }
    setLoading(false);
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/expenses", {
        headers: getAuthHeader(),
      });
      setExpenses(response.data.expenses);
    } catch (err) {
      console.error("Fetch expenses error:", err);
    }
  };

  const handleReset = () => {
    setExpenseAmount("");
    setSelectedCategory("None");
    setExpenseDate(new Date());
  };

  const categories = [
    "Housing Rent",
    "Utilities",
    "Groceries & Food",
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
              className="border px-6 py-3 remove-arrow rounded-3xl w-full appearance-none bg-[#1f1f1f] text-white "
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
            className="clr-emerald px-8 py-4 rounded-3xl"
            onClick={handleAddExpense}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
