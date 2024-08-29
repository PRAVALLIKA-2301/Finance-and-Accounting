import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const Piechart = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.chart._metasets[context.datasetIndex].total;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        display: false, // Disable the default legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grid lines on the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Remove grid lines on the y-axis
        },
      },
    },
    barPercentage: 0.7, // Reduce bar width (default is 0.9)
    categoryPercentage: 0.7, // Reduce space taken by bars in each category
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
    datasets: [
      {
        label: "Invoices Generated yearly",
        data: [30, 50, 45, 60, 70, 65],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  useEffect(() => {
    const finalEmpCount = 500;
    const finalActiveCount = 150;
    let currentCount = 0;
    const empIncrmt = Math.ceil(finalEmpCount / 50);

    const counterInterval = setInterval(() => {
      currentCount += empIncrmt;
      if (currentCount >= finalEmpCount) {
        setEmployeeCount(finalEmpCount);
        clearInterval(counterInterval);
      } else {
        setEmployeeCount(currentCount);
      }
    }, 50);

    const increment = Math.ceil(finalActiveCount / 50);

    const counterActInterval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= finalActiveCount) {
        setActiveCount(finalActiveCount);
        clearInterval(counterActInterval);
      } else {
        setActiveCount(currentCount);
      }
    }, 50);

    return () => {
      clearInterval(counterInterval);
      clearInterval(counterActInterval);
    };
  }, []);

  return (
    <div className="chart-container">
      <div className="yearlyEmp">
        <Bar data={barData} options={options} width={200} height={200} />
      </div>
    </div>
  );
};

export default Piechart;
