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

function PayableReceivableChart() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Account Payables",
        data: [12000, 15000, 13000, 18000, 16000, 19000],
        backgroundColor: "#4169e1",
      },
      {
        label: "Account Receivables",
        data: [10000, 14000, 11000, 17000, 15000, 20000],
        backgroundColor: "#36A2EB",
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
        text: "Account Payables vs Receivables",
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

export default PayableReceivableChart;
