import React, { useState } from "react";
import { Modal, Button, Form, Input, DatePicker, Select } from "antd";
import Dashboard from "../Components/Dashboard";
import "../pages/Payable.css";
import { IoMdHome } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
const { Option } = Select;
const Payable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // const [selectedAddNew, setSelectedAddNew] = useState(null);
  // const [isRowVisible, setISRowVisible] = useState(false);
  const [isAddNewModalVisible, setIsAddNewModalVisible] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRow(null);
  };
  const handleNewClick = () => {
    setIsAddNewModalVisible(true);
  };

  const handleAddNewCancel = () => {
    setIsAddNewModalVisible(false);
  };

  const handleAddNewFinish = (values) => {
    console.log("New Data: ", values);
    setIsAddNewModalVisible(false);
  };

  const data = [
    {
      category: "Office supplies",
      accountNo: "ACC-101",
      customerName: "Pravallika",
      invoiceNo: "INV-001",
      invoiceDate: "23/04/2023",
      paymentStatus: "Paid",
      paymentMode: "Cash",
      transactionDate: "22/04/2023",
      UTR: "UTR4567898",
    },
    {
      category: "Transportation",
      accountNo: "ACC-102",
      customerName: "Charan",

      invoiceNo: "INV-002",
      invoiceDate: "23/04/2023",
      paymentStatus: "Paid",
      paymentMode: "Bank Transfer",
      transactionDate: "22/04/2023",
      UTR: "UTR4567899",
    },
    {
      category: "Salaries",
      accountNo: "ACC-103",
      customerName: "koti",

      invoiceNo: "INV-003",
      invoiceDate: "23/04/2023",
      paymentStatus: "Unpaid",
      paymentMode: "Credit Card",
      transactionDate: "22/04/2023",
      UTR: "UTR4567900",
    },
    {
      category: "Marketing",
      accountNo: "ACC-104",
      customerName: "Devi",

      invoiceNo: "INV-004",
      invoiceDate: "23/04/2023",
      paymentStatus: "Unpaid",
      paymentMode: "Bank Transfer",
      transactionDate: "22/04/2023",
      UTR: "UTR4567901",
    },
    {
      category: "Insurance",
      accountNo: "ACC-105",
      customerName: "Durga",

      invoiceNo: "INV-006",
      invoiceDate: "23/04/2023",
      paymentStatus: "Unpaid",
      paymentMode: "EMI",
      transactionDate: "22/04/2023",
      UTR: "UTR4567904",
    },
  ];

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
              <button onClick={() => handleNewClick()}>
                <IoMdAdd className="add-icon" />
                Add new
              </button>
            </div>
          </div>

          {/* <div className="line"></div> */}

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Account no</th>
                <th>Customer Name</th>
                <th>Invoice no</th>
                <th>Invoice date</th>
                <th>Payment mode</th>

                <th>Payment status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(row)}>
                  <td>{row.category}</td>
                  <td>{row.accountNo}</td>
                  <td>{row.customerName}</td>
                  <td>{row.invoiceNo}</td>
                  <td>{row.invoiceDate}</td>
                  <td>{row.paymentMode}</td>

                  <td>{row.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
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
              <p>Category:{selectedRow.category}</p>
              <p>Transaction Date:{selectedRow.transactionDate}</p>
              <p>Invoice Date:{selectedRow.invoiceDate}</p>
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
              <p>UTR NO:{selectedRow.UTR}</p>
            </div>
          )}
        </Modal>

        <Modal
          title="Add New debit "
          visible={isAddNewModalVisible}
          onCancel={handleAddNewCancel}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleAddNewFinish}>
            <div className="abc" style={{ display: "flex", gap: "3rem" }}>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true, message: "Please enter category" }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="accountNo"
                  label="Account No"
                  rules={[
                    { required: true, message: "Please enter account number" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="abc" style={{ display: "flex", gap: "3rem" }}>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="invoiceNo"
                  label="Invoice No"
                  rules={[
                    { required: true, message: "Please enter invoice number" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="invoiceDate"
                  label="Invoice Date"
                  rules={[
                    { required: true, message: "Please select invoice date" },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </div>
            </div>
            <div className="abc" style={{ display: "flex", gap: "3rem" }}>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="paymentMode"
                  label="Payment Mode"
                  rules={[
                    { required: true, message: "Please select payment mode" },
                  ]}
                >
                  <Select>
                    <Option value="Cash">Cash</Option>
                    <Option value="Credit Card">Credit Card</Option>
                    <Option value="Bank Transfer">Bank Transfer</Option>
                    <Option value="EMI">EMI</Option>
                  </Select>
                </Form.Item>
              </div>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="paymentStatus"
                  label="Payment Status"
                  rules={[
                    { required: true, message: "Please select payment status" },
                  ]}
                >
                  <Select>
                    <Option value="Paid">Paid</Option>
                    <Option value="Unpaid">Unpaid</Option>
                    <Option value="Pending">Pending</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div>
              <div>
                <Form.Item
                  name="transactionDate"
                  label="Transaction Date"
                  rules={[
                    {
                      required: true,
                      message: "Please select transaction date",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
              </div>
            </div>
            <div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onFinish={handleAddNewFinish}
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Payable;
