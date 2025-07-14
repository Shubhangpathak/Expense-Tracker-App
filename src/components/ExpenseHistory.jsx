import React from "react";

const ExpenseHistory = () => {
  return (
    <>
      <div className="border px-4">
        <h3>ExpenseHistory</h3>
        <span>Last 30 Days</span>
        <div className="flex gap-5 px-4 py-3 border">
          <span id="date-logs">date-logs</span>
          <span id="categories-logs">categories-logs</span>
          <span id="balance-logs">balance-logs</span>
        </div>
      </div>
    </>
  );
};

export default ExpenseHistory;
