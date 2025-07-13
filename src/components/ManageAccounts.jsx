import React, { useState } from "react";

const ManageAccounts = () => {
  const [username, setUsername] = useState("shubhang");
  const [isModelOpen, setModelOpen] = useState(false);
  const [balance, setBalance] = useState(20000);

  return (
    <>
      <div className="px-5 pt-8 flex text-xl w-full">
        <h1 class="text-4xl w-2/5 items-center p-5">
          Welcome to <br /> safefund, {username}!
        </h1>
        <div className="border p-5 w-4/5">
          <div className="flex w-full">
            <div className="flex justify-between w-full">
              <p>Manage accounts</p>
              <img className="h-8" src="/settings.svg" alt="settings-icons" />
            </div>
          </div>
          <div className="flex gap-5">
            <button className="border px-4 py-2 clr-sapphire text-white">
              Opening Balance : {balance}
            </button>
            <button
              className="flex gap-5 text-center border items-center px-4 py-2"
              onClick={() => setModelOpen(true)}
            >
              Add Balance
              <img src="/plus.svg" alt="plus-icon" className="h-7" />
            </button>
          </div>
        </div>
      </div>
      {isModelOpen && (
        <div className="border max-w-xs items-center">
          <div className="flex justify-between items-center ">
            <h3>Add Balance</h3>
            <img
              src="/close.svg"
              alt="close-icon"
              onClick={() => setModelOpen(false)}
              className="h-8"
            />
          </div>
          <div className="flex">
            <input
              className="border px-4 py-2 mx-1 "
              type="number"
              id="amountInput"
            />
            <button
              className="bg-blue-500 px-4 py-2 text-white"
              onClick={() => {
                const inputValue = document.getElementById("amountInput").value;
                setBalance(balance + Number(inputValue));
                setModelOpen(false);
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageAccounts;
