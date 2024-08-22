import React from "react";
import Dashboard from "../Components/Dashboard";
const Receivable = () => {
  return (
    <>
      <Dashboard />
      <div>
        <div className="table-box">
          <button> ➕ Add new </button>
        </div>
        <div className="table-cont">
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
                <td>INV-001</td>
                <td>23/04/2023</td>
                <td>paid</td>
                <td>Cash</td>
              </tr>
              <tr>
                <td>Transportation</td>
                <td>ACC-102</td>
                <td>INV-002</td>
                <td>23/04/2023</td>
                <td>paid</td>
                <td>Bank Transfer</td>
              </tr>
              <tr>
                <td>Salaries</td>
                <td>ACC-103</td>
                <td>INV-003</td>
                <td>23/04/2023</td>
                <td>Unpaid</td>
                <td>Credit Card</td>
              </tr>
              <tr>
                <td>Marketing</td>
                <td>ACC-104</td>
                <td>INV-004</td>
                <td>23/04/2023</td>
                <td>Unpaid</td>
                <td>Bank Transfer</td>
              </tr>
              <tr>
                <td>Insurance</td>
                <td>ACC-105</td>
                <td>INV-006</td>
                <td>23/04/2023</td>
                <td>Unpaid</td>
                <td>Credit Card</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Receivable;
