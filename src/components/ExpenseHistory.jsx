import React, { useState } from "react";

const ExpenseHistory = ({ expenses }) => {
  return (
    <>
      <div className="border px-4 flex flex-col gap-4 ">
        <h3>ExpenseHistory</h3>
        <span>Last 30 Days</span>
        <div className="flex gap-5 px-4 py-3 border">
          <span id="date-logs">date-logs</span>
          <span id="categories-logs">categories-logs</span>
          <span id="balance-logs">balance-logs</span>
        </div>

        <div className="max-h-64 overflow-y-auto flex flex-col gap-2">
          {expenses.map((item, index) => (
            <div className="flex gap-5 px-4 py-3 border">
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
