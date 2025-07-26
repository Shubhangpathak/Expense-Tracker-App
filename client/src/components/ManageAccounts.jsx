// import { CategoryScale } from "chart.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const ManageAccounts = ({ balance, setBalance, setExpenses }) => {
  // const [username, setUsername] = useState("shubhang");
  const [username, setUsername] = useState(""); //api shit here
  const [isModelOpen, setModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [balanceDate, setBalanceDate] = useState(new Date());
  const [balanceInput, setBalanceInput] = useState();
  const [balanceAmount, setBalanceAmount] = useState();

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setUsername("shubh"); //temp later gonna decpt and then fetch user from db
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    };
    loadUserData();
  }, []);

  const updateBalance = async () => {
    if (!balanceAmount || !balanceInput) {
      alert("Please fill all fields!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/expense",
        {
          amount: balanceAmount,
          category: balanceInput, // Using input as category
          type: "income", //checked by backend after new
          date: balanceDate || new Date(),
        },
        { headers: getAuthHeader() }
      );
      setBalance(response.data.newBalance);
      fetchExpenses();

      setBalanceDate("01/08/2025");
      setBalanceInput("");
      setBalanceAmount("");
      setModelOpen(false);
    } catch (err) {
      console.error("Add balance error:", err);
      alert("Failed to add balance. Please try again.");
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

  return (
    <>
      <div className="px-5 pt-12 pb-2 flex text-xl w-full">
        <h1 className="text-4xl w-2/5 items-center p-5 font-semibold">
          Welcome to <br /> safefund, {username}!😊
        </h1>
        <div className="border p-5 w-4/5">
          <div className="flex w-full">
            <div className="flex justify-between w-full">
              <p>Manage accounts</p>
              <img className="h-8" src="/settings.svg" alt="settings-icons" />
            </div>
          </div>
          <div className="flex gap-6">
            <button className=" px-6 py-3 clr-sapphire text-white rounded-3xl border-white">
              Opening Balance : ₹{balance}
            </button>
            <button
              className="flex gap-5 text-center border items-center px-6 py-3 rounded-3xl "
              onClick={() => setModelOpen(true)}
            >
              Add Balance
              <img src="/plus.svg" alt="plus-icon" className="h-7" />
            </button>
          </div>
        </div>
      </div>
      {isModelOpen && (
        <div className="border max-w-xs flex flex-col ">
          <div className="flex justify-between items-center ">
            <h3 className="mx-3">Add Balance</h3>
            <img
              src="/close.svg"
              alt="close-icon"
              onClick={() => setModelOpen(false)}
              className="h-8"
            />
          </div>
          <input
            className="border px-4 py-2 mx-3 rounded-3xl"
            type="number"
            id="amountInput"
            placeholder="amount"
            value={balanceAmount}
            onChange={(e) => setBalanceAmount(e.target.value)}
          />

          <span className="mx-3">Input name</span>
          <input
            type="text"
            className="border rounded-3xl px-4 py-2 mx-3"
            placeholder="Ex: bonus"
            value={balanceInput}
            onChange={(e) => setBalanceInput(e.target.value)}
          />
          <span className="mx-3">Date</span>
          {/* <input
            type="date"
            className="border px-4 py-2 mx-3 rounded-3xl"
            value={balanceDate}
            onChange={(e) => setBalanceDate(e.target.value)}
          /> */}
          <DatePicker
            selected={balanceDate}
            onChange={(date) => setBalanceDate(date)}
            className="border px-9 py-2 mx-3 rounded-3xl"
            showYearDropdown
            scrollableYearDropdown
          />
          <button
            className="clr-sapphire px-4 py-2 text-white mx-3 my-2 rounded-3xl"
            onClick={updateBalance}
          >
            Add
          </button>
        </div>
      )}
    </>
  );
};

export default ManageAccounts;
