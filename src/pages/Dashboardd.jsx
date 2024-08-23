import "./Dashboard.css";
import "./Payable.css";
import Sidebar from "../Components/Dashboard";
import PayableReceivableChart from "../Components/PayableReceivableChart";
import CashFlowChart from "../Components/Cashflow";
import ProfitLossChart from "../Components/Profitloss";
import MonthlySummaryChart from "../Components/Monthlysummary";
import Piechart from "../Components/Piechart";

function Dashboardd() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        {/* Cards Section */}
        <div className="cards-container">
          <div className="card">
            <h3>Payables</h3>
            <p>Total Payables: $120,000</p>
            <p>Due Today: $15,000</p>
          </div>
          <div className="card">
            <h3>Receivables</h3>
            <p>Total Receivables: $150,000</p>
            <p>Overdue: $20,000</p>
          </div>
          <div className="card">
            <h3>Ledger Balance</h3>
            <p>Current Balance: $500,000</p>
            <p>Last Updated: 12 Aug 2024</p>
          </div>
          <div className="card">
            <h3>Vendors</h3>
            <p>Active Vendors: 35</p>
            <p>Pending Invoices: 10</p>
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
        </div>
      </div>
    </div>
  );
}

export default Dashboardd;
