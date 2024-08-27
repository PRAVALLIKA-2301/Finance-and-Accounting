import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
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
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#4169e1",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        fill: true,
      },
      {
        label: "Actual Spending",
        data: [23000, 18000, 28000, 13000, 11000, 14000],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "#36A2EB",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
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
        text: "Monthly Financial Summary",
      },
    },
  };

  return (
    <div className="chart-container">
      <Radar data={data} options={options} />
    </div>
  );
}

export default MonthlySummaryChart;
