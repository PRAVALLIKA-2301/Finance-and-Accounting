import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import Dashboard from "../Components/Dashboard";
import "../pages/Payable.css";
import { IoMdHome } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Payable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isAddNewModalVisible, setIsAddNewModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((row) => {
    return row.CName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Function to submit new customer data
  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/customer/addCustomer`, values);
      toast.success("Customer details added successfully.", { position: "top-center" });
      await handleFetchData();  // Fetch updated data after adding a new customer
    } catch (error) {
      console.log("Error in adding customer: ", error);
      toast.error("Error in adding customer. Please check the details and try again.", { position: "top-center" });
    }
  };

  // Function to fetch all customers' data
  const handleFetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/customer/allcustomers`);
      setData(res.data);
    } catch (error) {
      console.log("Error in fetching customers data: ", error);
      toast.error("Error while fetching customers data.", { position: "top-center" });
    }
  };

  // Function to fetch account details for a selected row
  const handleFetchAccountDetails = async (AccountCode) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/receivable/accountDetails/${AccountCode}`);
      return res.data;
    } catch (error) {
      console.log("Error in fetching account details: ", error);
      toast.error("Error while fetching account details.", { position: "top-center" });
    }
  };

  // Handle row click to show transaction details
  const handleRowClick = async (row) => {
    const data = await handleFetchAccountDetails(row.AccountCode);
    setSelectedRow(data);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRow(null);
  };

  // Handle opening of "Add New Customer" modal
  const handleNewClick = () => {
    setIsAddNewModalVisible(true);
  };

  // Handle closing of "Add New Customer" modal
  const handleAddNewCancel = () => {
    setIsAddNewModalVisible(false);
  };

  // Handle submission of new customer data
  const handleAddNewFinish = async (values) => {
    await handleSubmit(values);
    setIsAddNewModalVisible(false);
  };

  // Fetch data on component mount
  useEffect(() => {
    handleFetchData();
  }, []);

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
              <input
                type="text"
                placeholder="Enter Customer Name"
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
                <th>Name</th>
                <th>Mail</th>
                <th>Phone No</th>
                <th>Country</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(row)}>
                  <td>{row.CName}</td>
                  <td>{row.CMail}</td>
                  <td>{row.Cphone}</td>
                  <td>{row.Ccountry}</td>
                  <td>{row.Cstate}</td>
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
              <p>Customer Account No: {selectedRow.AccountCode}</p>
              <p>Transaction Date: {selectedRow.PaymentDate}</p>
              <p>Invoice Date: {selectedRow.InvoiceDate}</p>
              <p>Category: {selectedRow.Category}</p>
              <p>Payment Mode: {selectedRow.PaymentMode}</p>
              {selectedRow.PaymentStatus === "Unpaid" && (
                <>
                  <p>Due Date: {selectedRow.DueDate}</p>
                  <p>Amount Due: {selectedRow.AmountReceivable}</p>
                </>
              )}
            </div>
          )}
        </Modal>

        <Modal
          title="Add New Customer"
          visible={isAddNewModalVisible}
          onCancel={handleAddNewCancel}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleAddNewFinish}>
            <div className="abc" style={{ display: "flex", gap: "3rem" }}>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="CName"
                  label="Customer Name"
                  rules={[{ required: true, message: "Please enter Name" }]}
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
                  name="CMail"
                  label="E-mail"
                  rules={[{ required: true, message: "Please enter Email" }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="Cphone"
                  label="Phone No"
                  rules={[
                    { required: true, message: "Please enter Phone Number" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="abc" style={{ display: "flex", gap: "3rem" }}>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="Ccountry"
                  label="Country"
                  rules={[{ required: true, message: "Please enter Country" }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="Cstate"
                  label="State"
                  rules={[{ required: true, message: "Please enter State" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="abc" style={{ display: "flex", gap: "3rem" }}>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="Ccity"
                  label="City"
                  rules={[
                    { required: true, message: "Please enter City" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="Caddress"
                  label="Address"
                  rules={[
                    { required: true, message: "Please enter Address" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="Cpin"
                  label="Pin code"
                  rules={[
                    { required: true, message: "Please enter Pin code" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
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
