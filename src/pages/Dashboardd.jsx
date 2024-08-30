import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.css";
import "./Payable.css";
import Sidebar from "../Components/Dashboard";
import PayableReceivableChart from "../Components/PayableReceivableChart";
import CashFlowChart from "../Components/Cashflow";
import ProfitLossChart from "../Components/Profitloss";
import MonthlySummaryChart from "../Components/Monthlysummary";
import Piechart from "../Components/Piechart";
import InvoicesBar from "../Components/InvoicesBar";
import {
  FaRupeeSign,
  FaFileInvoice,
  FaWallet,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

function Dashboardd() {
  const [view, setView] = useState("vendors"); // State to manage the view
  const isInitialRender = useRef(true); // Ref to track the initial render

  // Effect to trigger on view change, not on initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false; // Set to false after initial render
      return; // Skip the effect on the initial render
    }
    // Perform actions based on the current view
    console.log(`Current view: ${view}`);
    // For example, fetch data or perform other side effects
  }, [view]);

  // Function to toggle between vendors and customers
  const toggleView = () => {
    setView(view === "vendors" ? "customers" : "vendors");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        {/* Cards Section */}
        <div className="cards-container">
          {/* Payables Card */}
          <div className="card">
            <div className="icon">
              <FaRupeeSign />
            </div>
            <h3>Payables</h3>
            <p>
              <span className="detail-label">Total Payables:</span> ₹1,20,000
            </p>
            <p>
              <span className="detail-label">Due Today:</span> ₹15,000
            </p>
          </div>

          {/* Receivables Card */}
          <div className="card">
            <div className="icon">
              <FaFileInvoice />
            </div>
            <h3>Receivables</h3>
            <p>
              <span className="detail-label">Total Receivables:</span> ₹1,50,000
            </p>
            <p>
              <span className="detail-label">Overdue:</span> ₹20,000
            </p>
          </div>

          {/* Ledger Balance Card */}
          <div className="card">
            <div className="icon">
              <FaWallet />
            </div>
            <h3>Ledger Balance</h3>
            <p>
              <span className="detail-label">Current Balance:</span> ₹5,00,000
            </p>
            <p>
              <span className="detail-label">Last Updated:</span> 12 Aug 2024
            </p>
          </div>

          {/* Vendors/Customers Card */}
          <div className="card">
            <div className="header-section">
              <div className="toggle-container">
                <FaUserTie
                  className={`icon ${
                    view === "vendors" ? "active" : ""
                  } toggleicons`}
                />
                <div className="toggle-slider">
                  <input
                    type="checkbox"
                    id="toggle"
                    checked={view === "customers"}
                    onChange={toggleView}
                    className="toggle-checkbox"
                  />
                  <label htmlFor="toggle" className="toggle-label">
                    <span className="slider"></span>
                  </label>
                </div>
                <FaUsers
                  className={`icon ${
                    view === "customers" ? "active" : ""
                  } toggleicons`}
                />
              </div>
            </div>

            <h3>{view === "vendors" ? "Vendors" : "Customers"}</h3>

            <p>
              <span className="detail-label">
                {view === "vendors" ? "Active Vendors:" : "Active Customers:"}
              </span>
              {view === "vendors" ? "35" : "50"}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-container">
          <div className="chart-section">
            <h2>Payables vs Receivables</h2>
            <PayableReceivableChart />
          </div>
          <div className="chart-section">
            <h2>Cash Flow</h2>
            <CashFlowChart />
          </div>
          <div className="chart-section">
            <h2>Profit and Loss</h2>
            <ProfitLossChart />
          </div>
          <div className="chart-section">
            <h2>Monthly Financial Summary</h2>
            <MonthlySummaryChart />
          </div>
          <div className="chart-section">
            <h2>Invoices</h2>
            <Piechart />
          </div>
          <div className="chart-section">
            <h2>Invoices Bar</h2>
            <InvoicesBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboardd;
