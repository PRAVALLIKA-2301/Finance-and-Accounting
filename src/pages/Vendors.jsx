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

  const vendorData = [
    {
      name: "Vendor A",
      contact: "1234567890",
      email: "VendorA@gmail.com",
      billing: "123 Main St, City A",
    },
    {
      name: "Vendor B",
      contact: "2345678901",
      email: "VendorB@gmail.com",
      billing: "234 Oak St, City B",
    },
    {
      name: "Vendor C",
      contact: "3456789012",
      email: "VendorC@gmail.com",
      billing: "456 Maple St, City D",
    },
    {
      name: "Vendor D",
      contact: "4567890123",
      email: "VendorD@gmail.com",
      billing: "345 Pine St, City C",
    },
    {
      name: "Vendor E",
      contact: "5678901234",
      email: "VendorE@gmail.com",
      billing: "678 Cedar St, City F",
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
            <p>Vendors</p>
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
                <th>Vendor Name</th>
                <th>Contact Number</th>
                <th>Email Address</th>
                <th>Billing Address</th>
              </tr>
            </thead>
            <tbody>
              {vendorData.map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(row)}>
                  <td>{row.name}</td>
                  <td>{row.contact}</td>
                  <td>{row.email}</td>
                  <td>{row.billing}</td>
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
              <p> Vendors Account No: {selectedRow.accountNo}</p>
              <p>Category: {selectedRow.category}</p>

              <p>Transaction Date: {selectedRow.transactionDate}</p>
              <p>Invoice Date: {selectedRow.invoiceDate}</p>
              <p>Payment Mode: {selectedRow.paymentMode}</p>
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

        <Modal
          title="Add New Vendor"
          visible={isAddNewModalVisible}
          onCancel={handleAddNewCancel}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleAddNewFinish}>
            <div className="abc" style={{ display: "flex", gap: "3rem" }}>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="Vendor Name"
                  label="Vendor Name"
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
                  name="Category"
                  label="Category"
                  rules={[
                    { required: true, message: "Please enter invoice number" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="Email Address"
                  label="Email Address"
                  rules={[
                    { required: true, message: "Please select invoice date" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="abc" style={{ display: "flex", gap: "3rem" }}>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="Billing Address"
                  label="Billing Address"
                  rules={[
                    { required: true, message: "Please select payment status" },
                  ]}
                >
                  {/* <Select>
                    <Option value="Paid">Paid</Option>
                    <Option value="Unpaid">Unpaid</Option>
                    <Option value="Pending">Pending</Option>
                  </Select> */}
                  <Input />
                </Form.Item>
              </div>
              {/* <div style={{ flexGrow: "1" }}>
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
              </div> */}
            </div>
            {/* <div>
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
            </div> */}
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
