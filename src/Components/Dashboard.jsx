import React from "react";
import "../Components/Dashboard.css";
// import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router";
const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashLink-cont">
      {/* <div className="dashLink-logo">
        <img
          src={logo}
          alt="logo.jpeg"
          style={{ height: "30px", width: "30px" }}
        />
        <span>
          <h2>VTS</h2>
        </span>
        <hr />
      </div> */}
      <div className="dashLink" onClick={() => navigate("/payable")}>
        <p >Payable</p>
      </div>
      <div className="dashLink" onClick={() => navigate("/receivable")}>
        <p>Receivable</p>
      </div>
      <div className="dashLink" onClick={() => navigate("/ledger")}>
        <p>Ledger</p>
      </div>
      <div className="dashLink" onClick={() => navigate("/vendors")}>
        <p>Vendors</p>
      </div>
    </div>
  );
};

export default Dashboard;
