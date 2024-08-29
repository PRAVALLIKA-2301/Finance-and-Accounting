import React from "react";
import { Pie } from "react-chartjs-2";
import "./Piechart.css";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement);

const Piechart = () => {
  const invoices = [
    { order_id: "B2BHUB000001", payment_status: 1, payment_verified: 0 },
    { order_id: "B2BHUB000002", payment_status: 1, payment_verified: 0 },
    { order_id: "B2BHUB000003", payment_status: 1, payment_verified: 1 },
    { order_id: "B2BHUB000004", payment_status: 0, payment_verified: 0 },
  ];

  const totalInvoices = invoices.length;
  const completedInvoices = invoices.filter(
    (invoice) => invoice.payment_status === 1 && invoice.payment_verified === 1
  ).length;
  const pendingInvoices = invoices.filter(
    (invoice) => invoice.payment_status === 0
  ).length;
  const inProgressInvoices = invoices.filter(
    (invoice) => invoice.payment_status === 1 && invoice.payment_verified === 0
  ).length;

  const pieData = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        data: [completedInvoices, pendingInvoices, inProgressInvoices],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
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

  return (
    <div className="chart-container">
      <div className="empCards">
        <div className="empCard">
          <h5 className="header">Total Invoices</h5>
          <div className="counter">{totalInvoices}</div>
        </div>
        <div className="empCard">
          <h5 className="header">Completed Invoices</h5>
          <div className="counter">{completedInvoices}</div>
        </div>
        <div className="empCard">
          <h5 className="header">Pending Invoices</h5>
          <div className="counter">{pendingInvoices}</div>
        </div>
        <div className="empCard">
          <h5 className="header">InProgress Invoices</h5>
          <div className="counter">{inProgressInvoices}</div>
        </div>
      </div>

      <div className="pie-chart-section">
        <div className="pie-chart-container">
          <Pie data={pieData} options={options} />
        </div>
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
  );
};

export default Piechart;
