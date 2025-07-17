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
          "#F87171",
          "#60A5FA",
          "#FBBF24",
          "#34D399",
          "#A78BFA",
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
