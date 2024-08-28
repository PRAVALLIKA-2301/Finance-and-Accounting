import "./Dashboard.css";
import "./Payable.css";
import Sidebar from "../Components/Dashboard";
import PayableReceivableChart from "../Components/PayableReceivableChart";
import CashFlowChart from "../Components/Cashflow";
import ProfitLossChart from "../Components/Profitloss";
import MonthlySummaryChart from "../Components/Monthlysummary";
import Piechart from "../Components/Piechart";
import InvoicesBar from "../Components/InvoicesBar";
import { NavLink } from "react-router-dom";
import {
  FaDollarSign,
  FaFileInvoice,
  FaWallet,
  FaUserTie,
} from "react-icons/fa";

function Dashboardd() {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        {/* Cards Section */}

        <div className="cards-container">
          {/* Payables Card */}
          <div className="card">
            <div className="icon">
              <FaDollarSign />
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

          {/* Vendors Card */}
          <div className="card">
            <div className="icon">
              <FaUserTie />
            </div>
            <h3>Vendors</h3>
            <p>
              <span className="detail-label">Active Vendors:</span> 35
            </p>
            {/* <p>
              <span className="detail-label">Pending Invoices:</span> 10
            </p> */}
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
            <h2>Invoices</h2>
            <InvoicesBar />
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
}

export default Dashboardd;
