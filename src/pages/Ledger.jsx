import React from "react";
import Dashboard from "../Components/Dashboard";
import "../pages/Ledger.css";
import { DatePicker, Space } from "antd";
import { IoMdHome } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

const Ledger = () => {
  const { RangePicker } = DatePicker;
  const ledgerData = [
    {
      AccNo: "ACC-101",
      date: "22-08-2024",
      Debit: "20,000",
      Credit: "30,000",
    },
    {
      AccNo: "ACC-102",
      date: "21-08-2024",
      Debit: "5000",
      Credit: "3000",
    },
    {
      AccNo: "ACC-103",
      date: "20-08-2024",
      Debit: "3000",
      Credit: "4000",
    },
    {
      AccNo: "ACC-104",
      date: "19-08-2024",
      Debit: "4000",
      Credit: "40,000",
    },
    {
      AccNo: "ACC-105",
      date: "18-08-2024",
      Debit: "20,000",
      Credit: "40,000",
    },
    {
      AccNo: "ACC-106",
      date: "17-08-2024",
      Debit: "6000",
      Credit: "2000",
    },
    {
      AccNo: "ACC-107",
      date: "16-08-2024",
      Debit: "3000",
      Credit: "1,00,000",
    },
  ];
  return (
    <div className="acc-ledger-section">
      <Dashboard />
      <div className="main--payable">
        <div className="navigation-indicator">
          <IoMdHome /> / Ledger
        </div>

        <div className="table-cont">
          <div className="table--optns">
            <p>Accounts</p>
            <div className="sort-calender">
              <button>
                <Space direction="vertical" size={12} />
                <RangePicker />
              </button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Account No</th>
                <th>Date</th>
                <th>Debits</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {ledgerData.map((e, index) => (
                <tr key={index}>
                  <td>{e.AccNo}</td>
                  <td>{e.date}</td>
                  <td>{e.Debit}</td>
                  <td>{e.Credit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ledger;
