import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Legend, Tooltip);

function ExpenseChart({ expenses }) {
  const [chartExpense, setChartExpense] = useState(expenses || []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const expensesRes = await axios.get("http://localhost:5000/expenses", {
          headers: getAuthHeader(),
        });
        console.log("Expenses from MongoDB:", expensesRes.data.expenses);
        setChartExpense(expensesRes.data.expenses);
      } catch (err) {
        console.error("Error loading expenses:", err);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      setChartExpense(expenses);
    }
  }, [expenses]);

  const groupedData = chartExpense.reduce((acc, curr) => {
    if (curr.type === "expense") {
      const cat = curr.category;
      acc[cat] = (acc[cat] || 0) + Number(curr.amount);
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(groupedData),
        backgroundColor: [
          "#F87171",
          "#60A5FA",
          "#FBBF24",
          "#34D399",
          "#A78BFA",
          "#F472B6",
          "#818CF8",
          "#FCD34D",
          "#6EE7B7",
          "#93C5FD",
          "#F9A8D4",
          "#FCA5A5",
          "#86EFAC",
          "#C4B5FD",
          "#FDBA74",
        ],
        hoverOffset: 4,
        borderColor: "transparent",
        cutout: "70%",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 12,
          },
          boxWidth: 15,
        },
      },
    },
  };

  return (
    <div className="w-90 flex flex-col text-center">
      <Doughnut data={data} options={options} />
      <span>Expense chart will render above</span>
    </div>
  );
}

export default ExpenseChart;
