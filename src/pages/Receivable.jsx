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
  const [isAddNewModalVisible, setIsAddNewModalVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handlePaymentStatusChange = (value) => {
    setPaymentStatus(value);
  };
  const data = [
    {
      category: "Office supplies",
      accountNo: "ACC-101",
      customerName: "Pravallika",
      invoiceNo: "INV-001",
      invoiceDate: "23/04/2024",
      paymentStatus: "Paid",
      paymentMode: "Cash",
      transactionDate: "22/04/2024",
      UTR: "UTR4567898",
      dueDate: "30/08/2024",
      dueAmount: "80,000",
    },
    {
      category: "Transportation",
      accountNo: "ACC-102",
      customerName: "Charan",

      invoiceNo: "INV-002",
      invoiceDate: "23/04/2024",
      paymentStatus: "Paid",
      paymentMode: "Bank Transfer",
      transactionDate: "22/04/2024",
      UTR: "UTR4567899",
      dueDate: "30/08/2024",
      dueAmount: "60,000",
    },
    {
      category: "Salaries",
      accountNo: "ACC-101",
      customerName: "koti",

      invoiceNo: "INV-003",
      invoiceDate: "23/04/2024",
      paymentStatus: "Unpaid",
      dateToday: "25/04/2024",
      dueDate: "30/08/2024",
      dueAmount: "30,000",
    },
    {
      category: "Marketing",
      accountNo: "ACC-104",
      customerName: "Devi",

      invoiceNo: "INV-004",
      invoiceDate: "23/04/2024",
      paymentStatus: "Unpaid",
      dueDate: "30/08/2024",
      dueAmount: "1,00,000",
    },
    {
      category: "Insurance",
      accountNo: "ACC-101",
      customerName: "Durga",

      invoiceNo: "INV-006",
      invoiceDate: "23/04/2024",
      paymentStatus: "Unpaid",
      dueDate: "30/08/2024",
      dueAmount: "50,000",
    },
  ];
  const filteredData = data.filter((row) => {
    return (
      row.accountNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.category.toLowerCase().includes(searchQuery.toLowerCase())
      // row.dueDate.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="acc-payable--section">
      <Dashboard />
      <div className="main--payable">
        <div className="navigation-indicator">
          <IoMdHome /> / Dashboard
        </div>

        <div className="table-cont">
          <div className="table--optns">
            <p>Debits</p>

            <div className="table-box">
              <input
                type="text"
                placeholder="search Account number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="table-box">
              <button onClick={handleNewClick}>
                <IoMdAdd className="add-icon" />
                Add new
              </button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Account no</th>
                <th>Invoice no</th>
                <th>Invoice date</th>
                <th>Due Amount</th>
                <th>Due Date</th>
                <th>Payment status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(row)}>
                  <td>{row.category}</td>
                  <td>{row.accountNo}</td>
                  <td>{row.invoiceNo}</td>
                  <td>{row.invoiceDate}</td>
                  <td>{row.dueAmount}</td>
                  <td>{row.dueDate}</td>
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
          {selectedRow && selectedRow.paymentStatus === "Paid" && (
            <div>
              <p>Account No: {selectedRow.accountNo}</p>
              <p>Category: {selectedRow.category}</p>
              <p>Invoice Date: {selectedRow.invoiceDate}</p>
              <p>Amount Paid: {selectedRow.dueAmount}</p>
              <p>Transaction Date: {selectedRow.transactionDate}</p>
              <p>Payment Mode: {selectedRow.paymentMode}</p>
            </div>
          )}
          {selectedRow && selectedRow.paymentStatus === "Unpaid" && (
            <div>
              <p>Amount need to be Paid: {selectedRow.dueAmount}</p>
              <p>Due Date: {selectedRow.dueDate}</p>
              <p>Payment Status: {selectedRow.paymentStatus}</p>
            </div>
          )}
        </Modal>

        <Modal
          title="Add New Debit"
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
                  name="paymentStatus"
                  label="Payment Status"
                  rules={[
                    { required: true, message: "Please select payment status" },
                  ]}
                >
                  <Select onChange={handlePaymentStatusChange}>
                    <Option value="Paid">Paid</Option>
                    <Option value="Unpaid">Unpaid</Option>
                  </Select>
                </Form.Item>
              </div>
              {paymentStatus === "Paid" && (
                <div style={{ flexGrow: "1" }}>
                  <Form.Item
                    name="paymentMode"
                    label="Payment Mode"
                    rules={[
                      {
                        required: true,
                        message: "Please select payment mode",
                      },
                    ]}
                  >
                    <Select>
                      <Option value="Cash">Cash</Option>
                      <Option value="Credit Card">Credit Card</Option>
                      <Option value="Bank Transfer">Bank Transfer</Option>
                    </Select>
                  </Form.Item>
                </div>
              )}
            </div>
            {paymentStatus === "Paid" && (
              <div className="abc" style={{ display: "flex", gap: "3rem" }}>
                <div style={{ flexGrow: "1" }}>
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
                <div style={{ flexGrow: "1" }}>
                  <Form.Item
                    name="UTR"
                    label="UTR"
                    rules={[
                      {
                        required: true,
                        message: "Please select UTR Number",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
            )}
            {paymentStatus === "Unpaid" && (
              <div className="abc" style={{ display: "flex", gap: "3rem" }}>
                <div style={{ flexGrow: "1" }}>
                  <Form.Item
                    name="dueAmount"
                    label="Due Amount"
                    rules={[
                      { required: true, message: "Please enter due amount" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div style={{ flexGrow: "1" }}>
                  <Form.Item
                    name="dueDate"
                    label="Due Date"
                    rules={[
                      { required: true, message: "Please select due date" },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                </div>
              </div>
            )}

            <div style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Payable;
