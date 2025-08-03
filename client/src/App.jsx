import React, { useState, useEffect } from "react";
import axios from "axios";

import ManageAccounts from "./components/ManageAccounts";
import AddExpense from "./components/AddExpense";
import ExpenseHistory from "./components/ExpenseHistory";
import ExpenseChart from "./components/ExpenseChart";
import ExpenseList from "./components/ExpenseList";
import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const refreshData = async () => {
    try {
      const token = localStorage.getItem("token");

      const balanceRes = await axios.get("http://localhost:5000/balance", {
        headers: getAuthHeader(),
      });
      setBalance(balanceRes.data.balance);

      const expensesRes = await axios.get("http://localhost:5000/expenses", {
        headers: getAuthHeader(),
      });
      setExpenses(expensesRes.data.expenses);
    } catch (error) {
      console.error("failed to refresh data", error);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/signin";
          return;
        }

        // to update balance even after refresh
        const balanceRes = await axios.get("http://localhost:5000/balance", {
          headers: getAuthHeader(),
        });
        setBalance(balanceRes.data.balance);

        // for expenses/balance logs
        const expensesRes = await axios.get("http://localhost:5000/expenses", {
          headers: getAuthHeader(),
        });
        setExpenses(expensesRes.data.expenses);
      } catch (err) {
        console.error("Error loading user data:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/signin";
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center align-center h-screen w-screen">
        Loading your details... 💰
      </div>
    );
  }

  return (
    <>
      {/* Removed fixed div that might cause overlay */}
      {/* <div className="fixed top-0 left-0 w-full pointer-events-none"></div> */}

      <ManageAccounts
        balance={balance}
        setBalance={setBalance}
        setExpenses={setExpenses}
      />
      <div className="flex flex-col sm:flex-row w-full h-[65vh] gap-2 px-5 ">
        <div className="w-1/3">
          <ExpenseHistory expenses={expenses} />
        </div>

        <div className="flex w-2/3 border h-full gap-8 justify-center items-center">
          <AddExpense setBalance={setBalance} setExpenses={setExpenses} />
          <ExpenseChart expenses={expenses} />
        </div>
      </div>
      <ExpenseList expenses={expenses} refreshData={refreshData} />
    </>
  );
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#070a13",
            color: "#9b9a9a",
            border: "1px solid #4a62ee",
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
          },
          success: {
            style: {
              background: "#070a13",
              color: "#43e56e",
              border: "1px solid #43e56e",
            },
          },
          error: {
            style: {
              background: "#070a13",
              color: "#931621",
              border: "1px solid #931621",
            },
          },
        }}
      />
    </>
  );
};

export default App;
