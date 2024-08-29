import React from "react";
import { Line } from "react-chartjs-2";

import "./Piechart.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CashFlowChart() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Cash Inflows",
        data: [30000, 40000, 35000, 50000, 45000, 60000],
        borderColor: "#4169e1",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      {
        label: "Cash Outflows",
        data: [20000, 25000, 22000, 30000, 28000, 35000],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
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
        text: "Cash Flow Overview",
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
      <Line data={data} options={options} />
    </div>
  );
}

export default CashFlowChart;
