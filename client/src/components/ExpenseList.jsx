import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function ExpenseList({ expenses, refreshData }) {
  // Alternative implementation if you need different types
  const handleDeleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: expenseId }),
      });

      const data = await response.json();

      if (response.ok) {
        await refreshData();
        toast.success("deleted successfully!");
      } else {
        toast.error("Failed to delete expense: " + data.message);
      }
    } catch (err) {
      console.error("Error deleting expense:", err);
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  return (
    <>
      <div className="mt-4 border mx-5 ">
        <div>{/* <h4 className="mx-4">Expense list</h4> */}</div>
        <div className="grid grid-cols-4 gap-5 px-4 py-4 mt-2 border rounded-3xl text center justidy-center mx-4">
          <span>Date-logs</span>
          <span>Categories-logs</span>
          <span>Balance-logs</span>
          <span>Action</span>
        </div>
        <div className="yourExpenseHistoryContainer overflow-y-auto gap-2 px-4 pt-5">
          {expenses.map((item, index) => (
            <div className="grid grid-cols-4 gap-5 px-4 py-4 border rounded-3xl mt-1">
              {/* <span id="date-logs">{item.date}</span> */}
              <span id="date-logs">
                {item.date
                  ? new Date(item.date).toLocaleDateString("en-IN")
                  : ""}
              </span>

              <span id="categories-logs">{item.category}</span>

              <span id="balance-logs">{item.amount}</span>

              <div className="flex gap-2">
                <button>
                  <img
                    src="/delete-icon.svg"
                    alt="delete_icon"
                    className="h-9 clr-ruby p-1 rounded-full cursor-pointer"
                    onClick={() => handleDeleteExpense(item._id)}
                  />
                </button>
                {/* <button className="border px-8 py-2 rounded-3xl">Edit</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ExpenseList;
