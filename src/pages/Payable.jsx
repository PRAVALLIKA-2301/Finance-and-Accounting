import React, { useState } from "react";
import { Modal, Button } from "antd";
import Dashboard from "../Components/Dashboard";
import "../pages/Payable.css";

const Payable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [selectedAddNew, setSelectedAddNew] = useState(null);
  const [isRowVisible, setISRowVisible] = useState(false);
  // const [onSubmit, setOnSubmit] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRow(null);
  };
  const handleNewClick = () => {
    setISRowVisible(true);
  };
  // const handlesubmit = () => {
  //   setOnSubmit(true);
  // };

  const data = [
    {
      category: "Office supplies",
      accountNo: "ACC-101",
      invoiceNo: "INV-001",
      invoiceDate: "23/04/2023",
      paymentStatus: "Paid",
      paymentMode: "Cash",
      transactionDate: "22/04/2023",
    },
    {
      category: "Transportation",
      accountNo: "ACC-102",
      invoiceNo: "INV-002",
      invoiceDate: "23/04/2023",
      paymentStatus: "Paid",
      paymentMode: "Bank Transfer",
      transactionDate: "22/04/2023",
    },
    {
      category: "Salaries",
      accountNo: "ACC-103",
      invoiceNo: "INV-003",
      invoiceDate: "23/04/2023",
      paymentStatus: "Unpaid",
      paymentMode: "Credit Card",
      transactionDate: "22/04/2023",
    },
    {
      category: "Marketing",
      accountNo: "ACC-104",
      invoiceNo: "INV-004",
      invoiceDate: "23/04/2023",
      paymentStatus: "Unpaid",
      paymentMode: "Bank Transfer",
      transactionDate: "22/04/2023",
    },
    {
      category: "Insurance",
      accountNo: "ACC-105",
      invoiceNo: "INV-006",
      invoiceDate: "23/04/2023",
      paymentStatus: "Unpaid",
      paymentMode: "EMI",
      transactionDate: "22/04/2023",
    },
  ];

  return (
    <>
      <Dashboard />
      <div>
        <div className="table-box">
          <button onClick={handleNewClick}> ➕ Add new </button>
        </div>
        <div className="table-cont">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Account no</th>
                <th>Invoice no</th>
                <th>Invoice date</th>
                <th>Payment status</th>
                <th>Payment mode</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(row)}>
                  <td>{row.category}</td>
                  <td>{row.accountNo}</td>
                  <td>{row.invoiceNo}</td>
                  <td>{row.invoiceDate}</td>
                  <td>{row.paymentStatus}</td>
                  <td>{row.paymentMode}</td>
                </tr>
              ))}
              {isRowVisible && (
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
              )}
            </tbody>
            {isRowVisible && <Button>Submit</Button>}
          </table>
        </div>

        <Modal
          title="Transaction Details"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          {selectedRow && (
            <div>
              <p>Account No:{selectedRow.accountNo}</p>
              <p>Transaction Date:{selectedRow.transactionDate}</p>
              <p>Invoice Date:{selectedRow.invoiceDate}</p>
              <p>Category:{selectedRow.category}</p>
              <p>Payment Mode:{selectedRow.paymentMode}</p>
              {selectedRow.paymentMode === "EMI" && (
                <>
                  <p>Due Date: 24/12/2024{selectedRow.dueDate}</p>
                  <p>
                    Amount Due: 2,00,000
                    {selectedRow.amountDue}
                  </p>
                </>
              )}
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Payable;
