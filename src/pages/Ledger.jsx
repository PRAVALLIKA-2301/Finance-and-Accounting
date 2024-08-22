import React from "react";
import Dashboard from "../Components/Dashboard";
import "../pages/Ledger.css";
import { DatePicker, Space } from "antd";

const Ledger = () => {
  const { RangePicker } = DatePicker;
  const ledgerData = [
    {
      date: "22-08-2024",
      Debit: "20,000",
      Credit: "30,000",
    },
    {
      date: "21-08-2024",
      Debit: "5000",
      Credit: "3000",
    },
    {
      date: "20-08-2024",
      Debit: "3000",
      Credit: "4000",
    },
    {
      date: "19-08-2024",
      Debit: "4000",
      Credit: "40,000",
    },
    {
      date: "18-08-2024",
      Debit: "20,000",
      Credit: "40,000",
    },
    {
      date: "17-08-2024",
      Debit: "6000",
      Credit: "2000",
    },
    {
      date: "16-08-2024",
      Debit: "3000",
      Credit: "1,00,000",
    },
  ];
  return (
    <div className="acc-ledger-section">
      <Dashboard />
      <div>
        <Space direction="vertical" size={12} />
        <RangePicker />
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Payable</th>
              <th>Receivable</th>
            </tr>
          </thead>
          <tbody>
            {ledgerData.map((e, index) => (
              <tr key={index}>
                <td>{e.date}</td>
                <td>{e.Debit}</td>
                <td>{e.Credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ledger;
