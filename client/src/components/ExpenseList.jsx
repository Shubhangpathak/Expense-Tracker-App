import React from "react";

function ExpenseList({ expenses }) {
  return (
    <>
      <div className="mt-4 border mx-5 ">
        <div>
          <h4 className="mx-4">Expense list</h4>
        </div>
        <div className="grid grid-cols-4 gap-5 px-4 py-4 border rounded-3xl text center justidy-center mx-4">
          <span>Date & Time</span>
          <span>categories-logs</span>
          <span>balance-logs</span>
          {/* <div className="flex gap-2">
            <button>
              <img
                src="/delete-icon.svg"
                alt="delete_icon"
                className="h-9 clr-ruby p-1 rounded-full"
              />
            </button>
            <button className="border px-8 py-2 rounded-3xl">Edit</button>
          </div> */}
          <span>Action</span>
        </div>
        <div className="yourExpenseHistoryContainer overflow-y-auto gap-2 px-4 pt-5">
          {expenses.map((item, index) => (
            <div className="grid grid-cols-4 gap-5 px-4 py-4 border rounded-3xl mt-1">
              <span id="date-logs">{item.date}</span>

              <span id="categories-logs">{item.category}</span>

              <span id="balance-logs">{item.amount}</span>

              <div className="flex gap-2">
                <button>
                  <img
                    src="/delete-icon.svg"
                    alt="delete_icon"
                    className="h-9 clr-ruby p-1 rounded-full"
                  />
                </button>
                <button className="border px-8 py-2 rounded-3xl">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ExpenseList;
