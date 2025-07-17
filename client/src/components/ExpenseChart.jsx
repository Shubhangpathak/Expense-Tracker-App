import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Legend, Tooltip);

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
