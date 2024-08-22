import React from "react";
import "../Components/Dashboard.css";
// import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

import { MdOutlinePayment } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { PiNotebookThin } from "react-icons/pi";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashLink-cont">
      {/* logo */}
      <div className="dashLink-logo">
        <img
          src={"fbf"}
          alt="logo.jpeg"
          style={{ height: "30px", width: "30px" }}
        />
        <span>
          <h2>VTS</h2>
        </span>
        <hr />
      </div>

      <div className="line"></div>

      {/* menu's */}
      <ul className="nav-menus-ul">
        <li className="dashLink">
          <NavLink exact to="/payable" activeClassName="active">
            <MdOutlinePayment size={20} /> Payable
          </NavLink>
        </li>
        <li className="dashLink">
          <NavLink exact to="/receivable" activeClassName="active">
            <GiReceiveMoney size={20} /> Receivable
          </NavLink>
        </li>
        <li className="dashLink">
          <NavLink exact to="/ledger" activeClassName="active">
            <PiNotebookThin size={20} /> Ledger
          </NavLink>
        </li>
        <li className="dashLink">
          <NavLink exact to="/vendors" activeClassName="active">
            <FaHandshake size={20} /> Vendors
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;