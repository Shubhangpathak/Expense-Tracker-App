import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
function ExpenseChart({ expenses }) {
  const groupedData = expenses.reduce((acc, curr) => {
    if (curr.type === "expense") {
      const cat = curr.category;
      acc[cat] = (acc[cat] || 0) + curr.amount;
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
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#00C49F",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="w-80 flex flex-col text-center">
      <Doughnut data={data} />
      <span>Expense will render above</span>
    </div>
  );
}

export default ExpenseChart;
