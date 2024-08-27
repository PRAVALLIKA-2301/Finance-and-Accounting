import React from "react";
import "../Components/Dashboard.css";
import logo from "../assets/ERP_logo.png";
// import logo from "../assets/logo.jpeg";
// import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { FaPeopleGroup } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { MdOutlinePayment } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { PiNotebookThin } from "react-icons/pi";

const Dashboard = () => {
  return (
    <div className="dashLink-cont">
      {/* logo */}
      <div className="dashLink-logo">
        {/* <img src={logo} alt="" width={150} height={90} /> */}
        <hr />
      </div>

      <div className="line"></div>

      {/* menu's */}
      <ul className="nav-menus-ul">
        <li className="dashLink">
          <NavLink exact to="/" activeClassName="active">
            <RxDashboard size={20} /> Dashboard
          </NavLink>
        </li>
        <li className="dashLink">
          <NavLink exact to="/customer" activeClassName="active">
            <FaPeopleGroup size={20} /> Customers
          </NavLink>
        </li>
        <li className="dashLink">
          <NavLink exact to="/vendors" activeClassName="active">
            <FaHandshake size={20} /> Vendors
          </NavLink>
        </li>
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
      </ul>
    </div>
  );
};

export default Dashboard;
