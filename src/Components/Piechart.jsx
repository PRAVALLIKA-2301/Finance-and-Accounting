import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "./Piechart.css";

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

  const pieData = {
    labels: ["Jr.softwaredev", "Senior dev", "Business", "Technical lead"],
    datasets: [
      {
        data: [15, 20, 25, 10],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#9966FF",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#9966FF",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
        ],
      },
    ],
  };

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
  };

  const barData = {
    labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Employees Joined yearly",
        data: [30, 50, 45, 60, 70, 65],
        backgroundColor: "#3097d1",
      },
    ],
  };

  useEffect(() => {
    const finalEmpCount = 632;
    const finalActiveCount = 458;
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

    return () => clearInterval(counterInterval, counterActInterval);
  }, []);

  return (
    <div className="chart-container">
      <div className="empCards">
        <div className="empCard">
          <h5 className="header">Employees Count</h5>
          <div className="counter">{employeeCount}</div>
        </div>
        <div className="empCard">
          <h5 className="header">Active Employees</h5>
          <div className="counter">{activeCount}</div>
        </div>
      </div>
      <div className="jobTitlePie">
        <div className="pie-chart-container">
          <Pie data={pieData} options={options} width={200} height={200} />
          <div className="legend-container">
            {pieData.labels.map((label, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{
                    backgroundColor: pieData.datasets[0].backgroundColor[index],
                  }}
                ></span>
                <span className="legend-label">{`${label}: ${pieData.datasets[0].data[index]}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="yearlyEmp">
        <Bar
          data={barData}
          options={{ maintainAspectRatio: false }}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default Piechart;
