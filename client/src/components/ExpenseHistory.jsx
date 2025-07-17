import React, { useState } from "react";

const ExpenseHistory = ({ expenses }) => {
  return (
    <>
      <div className="border px-4 flex flex-col gap-4 h-full ">
        <div className="pt-12">
          <h3>ExpenseHistory</h3>
          <span className="text-gray-400">Last 30 Days</span>
        </div>
        <div className="grid grid-cols-3 gap-5 px-4 py-4 border rounded-3xl text-center ">
          <span id="date-logs">date-logs</span>
          <span id="categories-logs">categories-logs</span>
          <span id="balance-logs">balance-logs</span>
        </div>

        <div className="yourExpenseHistoryContainer max-h-64 overflow-y-auto gap-2">
          {expenses.map((item, index) => (
            <div className="grid grid-cols-3 gap-5 px-4 py-4 border rounded-3xl text-center mt-1">
              <span id="date-logs">{item.date}</span>
              <span id="categories-logs">{item.category}</span>
              <span id="balance-logs">{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExpenseHistory;
