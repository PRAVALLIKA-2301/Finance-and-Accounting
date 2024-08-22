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

  const customerData = [
    {
      cName: "Pravallika",
      cMail: "abc@gmail.com",
      cPhone: "1234567890",
      cCountry: "India",
      cState: "Andhra Pradesh",
      cCity: "Vizianagaram",
      cPin: "535004",
      cAddress: "abc",
    },
    {
      cName: "Charan",
      cMail: "abc@gmail.com",
      cPhone: "1234567890",
      cCountry: "India",
      cState: "Andhra Pradesh",
      cCity: "Vizianagaram",
      cPin: "535004",
      cAddress: "abc",
    },
    {
      cName: "Koti",
      cMail: "abc@gmail.com",
      cPhone: "1234567890",
      cCountry: "India",
      cState: "Andhra Pradesh",
      cCity: "Vizianagaram",
      cPin: "535004",
      cAddress: "abc",
    },
    {
      cName: "Durga",
      cMail: "abc@gmail.com",
      cPhone: "1234567890",
      cCountry: "India",
      cState: "Andhra Pradesh",
      cCity: "Vizianagaram",
      cPin: "535004",
      cAddress: "abc",
    },
    {
      cName: "Devi",
      cMail: "abc@gmail.com",
      cPhone: "1234567890",
      cCountry: "India",
      cState: "Andhra Pradesh",
      cCity: "Vizianagaram",
      cPin: "535004",
      cAddress: "abc",
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
            <p>Customers</p>
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
                <th>Name</th>
                <th> Mail</th>
                <th> Phone No</th>
                <th> Country</th>
                <th> State</th>
                <th> City</th>
                <th> Pin</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(row)}>
                  <td>{row.cName}</td>
                  <td>{row.cMail}</td>
                  <td>{row.cPhone}</td>
                  <td>{row.cCountry}</td>
                  <td>{row.cState}</td>
                  <td>{row.cCity}</td>
                  <td>{row.cPin}</td>
                  <td>{row.cAddress}</td>
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
              <p>Account No: {selectedRow.accountNo}</p>
              <p>Transaction Date: {selectedRow.transactionDate}</p>
              <p>Invoice Date: {selectedRow.invoiceDate}</p>
              <p>Category: {selectedRow.category}</p>
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
