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
  const [data, setData] = useState([
    
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((row) => {
    return (
      row.AccountCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.Category.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
    await handleSubmit(values);
    setIsAddNewModalVisible(false);
    await handleFetch();
  };

  const handlePaymentStatusChange = (value) => {
    setPaymentStatus(value);
  };

  const handleFetch = async () => {
    try {
      // const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/receivable/allReceivables`);
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/receivable/allReceivables`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching....", { position: "top-center" });
    }
  };

  const handleSubmit = async (values) => {
    try {
      // const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/receivable/addReceivable`, values);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/receivable/addReceivable`,
        values
      );

      toast.success("Details added ...", { position: "top-center" });
    } catch (error) {
      console.log(error);
      toast.error("Error while adding the data...", { position: "top-center" });
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
          <IoMdHome /> / Receivable
        </div>

        <div className="table-cont">
          <div className="table--optns">
            <p>Debits</p>
            <div className="table-box">
              <div className="search-container">
                <MdSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Vendor"
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
                <th>Due Amount</th>
                <th>Due Date</th>
                <th>Payment status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(row)}>
                  <td>{row.Category}</td>
                  <td>{row.AccountCode}</td>
                  <td>{row.InvoiceNumber}</td>
                  <td>{row.InvoiceDate}</td>
                  <td>{row.AmountReceivable}</td>
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
          {selectedRow && selectedRow.PaymentStatus === "Paid" && (
            <div>
              <p>Account No: {selectedRow.AccountCode}</p>
              <p>Category: {selectedRow.Category}</p>
              <p>Invoice Date: {selectedRow.InvoiceDate}</p>
              <p>Amount Paid: {selectedRow.AmountReceivable}</p>
              <p>Transaction Date: {selectedRow.PaymentDate}</p>
              <p>Payment Mode: {selectedRow.PaymentMode}</p>
            </div>
          )}
          {selectedRow && selectedRow.PaymentStatus === "Unpaid" && (
            <div>
              <p>Amount need to be Paid: {selectedRow.AmountReceivable}</p>
              <p>Due Date: {selectedRow.DueDate}</p>
              <p>Payment Status: {selectedRow.PaymentStatus}</p>
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
                <div style={{ flexGrow: "1" }}>
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
                    name="UTR"
                    label="UTR"
                    rules={[
                      {
                        required: true,
                        message: "Please enter UTR Number",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div style={{ flexGrow: "1" }}>
                  <Form.Item
                    name="AmountReceivable"
                    label="Amount Paid"
                    rules={[
                      {
                        required: true,
                        message: "Please enter amount total amount",
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
                    name="AmountReceivable"
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
                    name="DueDate"
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
      <ToastContainer />
    </div>
  );
};

export default Payable;
