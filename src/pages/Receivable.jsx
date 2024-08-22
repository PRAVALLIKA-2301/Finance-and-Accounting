import React from "react";
import Dashboard from "../Components/Dashboard";
import { IoMdHome } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import "./Payable.css";

const Receivable = () => {
  return (
    <div className="acc-payable--section">
      <Dashboard />
      <div className="main--payable">
        <div className="navigation-indicator">
          <IoMdHome /> / Dashboard
        </div>

        <div className="table-cont">
          <div className="table--optns">
            <p>Credits</p>
            <div className="table-box">
              <button onClick={() => "ff"}>
                <IoMdAdd className="add-icon" />
                Add new
              </button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th> Account no </th>
                <th>Customer Name</th>
                <th>Invoice no</th>
                <th>Invoice date</th>
                <th>Payment status</th>
                <th>Payment mode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Office supplies</td>
                <td>ACC-101</td>
                <td>pravalika</td>
                <td>INV-001</td>
                <td>23/04/2023</td>
                <td>paid</td>
                <td>Cash</td>
              </tr>
              <tr>
                <td>Transportation</td>
                <td>ACC-102</td>
                <td>charan</td>
                <td>INV-002</td>
                <td>23/04/2023</td>
                <td>paid</td>
                <td>Bank Transfer</td>
              </tr>
              <tr>
                <td>Salaries</td>
                <td>ACC-103</td>
                <td>koti</td>
                <td>INV-003</td>
                <td>23/04/2023</td>
                <td>Unpaid</td>
                <td>Credit Card</td>
              </tr>
              <tr>
                <td>Marketing</td>
                <td>ACC-104</td>
                <td>mohan</td>
                <td>INV-004</td>
                <td>23/04/2023</td>
                <td>Unpaid</td>
                <td>Bank Transfer</td>
              </tr>
              <tr>
                <td>Insurance</td>
                <td>ACC-105</td>
                <td>devi</td>
                <td>INV-006</td>
                <td>23/04/2023</td>
                <td>Unpaid</td>
                <td>Credit Card</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Receivable;