import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MonthlySummaryChart() {
  const data = {
    labels: [
      "Sales",
      "Marketing",
      "Development",
      "Customer Support",
      "IT",
      "Admin",
    ],
    datasets: [
      {
        label: "Budget Allocation",
        data: [25000, 20000, 30000, 15000, 10000, 12000],
        backgroundColor: "#4169e1",
        borderColor: "#4169e1",
      },
      {
        label: "Actual Spending",
        data: [23000, 18000, 28000, 13000, 11000, 14000],
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Financial Summary",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Disable grid lines on the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Disable grid lines on the y-axis
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}

export default MonthlySummaryChart;
