import React, { useState } from "react";

const ManageAccounts = () => {
  const [username, setUsername] = useState("shubhang");
  //gonna fetch from api later
  const [isModelOpen, setModelOpen] = useState(false);
  const [balance, setBalance] = useState(20000);

  return (
    <>
      <div className="px-10 mx-8 my-3 border flex justify-between text-xl">
        <h1 class="text-4xl">
          Welcome to <br /> safefund, {username}!
        </h1>
        <div className=" mx-12">
          <div className="flex justify-between w-full">
            <div className="flex justify-between">
              <p>Manage accounts</p>
              <img className="h-6" src="/settings.svg" alt="settings-icons" />
            </div>
          </div>
          <div className="flex gap-5 justify-between">
            <button className="border bg-blue-500">
              Opening Balance : {balance}
            </button>
            <button className="border flex" onClick={() => setModelOpen(true)}>
              Add Balance <img src="/plus.svg" alt="plus-icon" />
            </button>
          </div>
        </div>
      </div>
      {isModelOpen && (
        <div
          className="border max-w-xs
 items-center"
        >
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
