import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, DatePicker, Select } from "antd";
import Dashboard from "../Components/Dashboard";
import "../pages/Payable.css";
import { IoMdHome } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MdSearch } from "react-icons/md";

const { Option } = Select;

const Payable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isAddNewModalVisible, setIsAddNewModalVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const payableData = [
    {
      category: "Office Supplies",
      AccountNo: "ACC-001",
      InvoiceNo: "INV-1001",
      Invoicedate: "01-08-2024",
      DueDate: "11-08-2024",
      DueAmount: "1500.00",
      PaymentStatus: "Pending",
    },
    {
      category: "Consulting Services",
      AccountNo: "ACC-002",
      InvoiceNo: "INV-1002",
      Invoicedate: "05-08-2024",
      DueDate: "-",
      DueAmount: "5000.00",
      PaymentStatus: "Paid",
    },
    {
      category: "IT Equipment",
      AccountNo: "ACC-003",
      InvoiceNo: "INV-1003",
      Invoicedate: "10-08-2024",
      DueDate: "20-08-2024",
      DueAmount: "12000.00",
      PaymentStatus: "Pending",
    },
    {
      category: "Marketing",
      AccountNo: "ACC-004",
      InvoiceNo: "INV-1004",
      Invoicedate: "15-08-2024",
      DueDate: "25-08-2024",
      DueAmount: "8000.00",
      PaymentStatus: "In Progress",
    },
    {
      category: "Software Licenses",
      AccountNo: "ACC-005",
      InvoiceNo: "INV-1005",
      Invoicedate: "20-08-2024",
      DueDate: "30-08-2024",
      DueAmount: "3000.00",
      PaymentStatus: "Pending",
    },
    {
      category: "Transportation",
      AccountNo: "ACC-006",
      InvoiceNo: "INV-1006",
      Invoicedate: "25-08-2024",
      DueDate: "-",
      DueAmount: "4500.00",
      PaymentStatus: "Paid",
    },
    {
      category: "Utilities",
      AccountNo: "ACC-007",
      InvoiceNo: "INV-1007",
      Invoicedate: "30-08-2024",
      DueDate: "09-09-2024",
      DueAmount: "2000.00",
      PaymentStatus: "In Progress",
    },
  ];

  const filteredData = payableData.filter((row) => {
    return row.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

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

  const handleAddNewFinish = async (values) => {
    console.log("New Data: ", values);
    await handleSubmit(values); // Add await here
    await handleFetch(); // Add await here
    setIsAddNewModalVisible(false);
  };

  const handlePaymentStatusChange = (value) => {
    setPaymentStatus(value);
  };

  const handleFetch = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/Payable/allPayables`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
      // toast.error("Error while fetching data...", { position: "top-center" });
    }
  };

  const handleSubmit = async (values) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/Payable/addPayable`,
        values
      );
      toast.success("Data saved...", { position: "top-center" });
    } catch (error) {
      console.log(error);
      // toast.error("Error while saving the data...", { position: "top-center" });
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="acc-payable--section">
      <Dashboard />
      <div className="main--payable">
        <div className="navigation-indicator">
          <IoMdHome /> / Payable
        </div>

        <div className="table-cont">
          <div className="table--optns">
            <p>Debits</p>

            <div className="table-box">
              <div className="search-container">
                <MdSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Category "
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <div>
                <button onClick={handleNewClick}>
                  <IoMdAdd className="add-icon" />
                  Add new
                </button>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Account no</th>
                <th>Invoice no</th>
                <th>Invoice date</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Payment status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td>{row.category}</td>
                  <td>{row.AccountNo}</td>
                  <td>{row.InvoiceNo}</td>
                  <td>{row.Invoicedate}</td>
                  <td>{row.DueAmount}</td>
                  <td>{row.DueDate}</td>
                  <td>{row.PaymentStatus}</td>
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
              <p>Account No: {selectedRow.AccountCode}</p>
              <p>Category: {selectedRow.Category}</p>
              <p>Invoice Date: {selectedRow.InvoiceDate}</p>
              <p>Amount Due: {selectedRow.AmountDue}</p>
              {selectedRow.PaymentStatus === "Paid" && (
                <>
                  <p>Transaction Date: {selectedRow.PaymentDate}</p>
                  <p>Payment Mode: {selectedRow.PaymentMode}</p>
                </>
              )}
              <p>Payment Status: {selectedRow.PaymentStatus}</p>
              {selectedRow.PaymentStatus === "Unpaid" && (
                <>
                  <p>Due Date: {selectedRow.DueDate}</p>
                </>
              )}
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
                  name="Category"
                  label="Category"
                  rules={[{ required: true, message: "Please enter category" }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="AccountCode"
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
                  name="InvoiceNumber"
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
                  name="InvoiceDate"
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
                  name="PaymentStatus"
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
                    name="PaymentMode"
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
                <div>
                  <Form.Item
                    name="PaymentDate"
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
                    name="AmountDue"
                    label="Paid Amount"
                    rules={[
                      { required: true, message: "Please enter due amount" },
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
                    name="DueDate"
                    label="Due Date"
                    rules={[
                      { required: true, message: "Please select due date" },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                </div>
                <div style={{ flexGrow: "1" }}>
                  <Form.Item
                    name="AmountDue"
                    label="Due Amount"
                    rules={[
                      { required: true, message: "Please enter due amount" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
            )}

            <div style={{ textAlign: "center" }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Payable;
