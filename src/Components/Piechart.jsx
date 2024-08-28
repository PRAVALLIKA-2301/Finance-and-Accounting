import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateChange = (e) => {
    if (e.target.name === "startDate") {
      setStartDate(e.target.value);
    } else if (e.target.name === "endDate") {
      setEndDate(e.target.value);
    }
  };

  const [employeeCount, setEmployeeCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  const pieData = {
    labels: ["Completed", "Pending", "InProgress"],
    datasets: [
      {
        data: [300, 200, 120],
        backgroundColor: ["#FF6384", "#36A2EB", "#4169e1"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#4169e1"],
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

    return () => clearInterval(counterInterval, counterActInterval);
  }, []);

  return (
    <div className="chart-container">
      <div className="date-filter">
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleDateChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleDateChange}
          />
        </label>
      </div>

      <div className="empCards">
        <div className="empCard">
          <h5 className="header"> Invoices Count</h5>
          <div className="counter">{employeeCount}</div>
        </div>
        <div className="empCard">
          <h5 className="header">Pending Invoices</h5>
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
      {/* <div className="yearlyEmp">
        <Bar
          data={barData}
          options={{ maintainAspectRatio: false }}
          width={200}
          height={200}
        />
      </div> */}
    </div>
  );
};

export default Piechart;
