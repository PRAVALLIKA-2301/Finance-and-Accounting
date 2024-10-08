import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import Dashboard from "../Components/Dashboard";
import "../pages/Payable.css";
import { IoMdHome } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MdSearch } from "react-icons/md";
import CustomerTransAll from "../Components/customerTransAll/CustomerTransAll";

const Payable = () => {
  const [customerAllTrans, setCustomerAllTrans] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // data of specific customer/
  const [clickedCustomerID, setClickedCustomerID] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  //
  const [isAddNewModalVisible, setIsAddNewModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((row) => {
    return row.Company_Name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Function to submit new customer data
  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/customer/addCustomer`,
        values
      );
      console.log(values);
      toast.success("Customer details added successfully.", {
        position: "top-center",
      });
      await handleFetchData(); // Fetch updated data after adding a new customer
    } catch (error) {
      console.log("Error in adding customer: ", error);
      toast.error(
        "Error in adding customer. Please check the details and try again.",
        { position: "top-center" }
      );
    }
  };

  // Function to fetch all customers' data
  const handleFetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}user/get-users`
      );
      setData(res.data);
      console.log("userdata", res.data);
    } catch (error) {
      console.log("Error in fetching customers data: ", error);
      toast.error("Error while fetching customers data.", {
        position: "top-center",
      });
    }
  };

  // Function to fetch account details for a selected row

  // Handle row click to show transaction details

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

  const handleCustomerClick = (ac) => {
    setClickedCustomerID(ac);
    setCustomerAllTrans(true);
  };

  const handleBackBtn = () => {
    setCustomerAllTrans(false);
  };

  return (
    <div className="acc-payable--section">
      <Dashboard />
      <div className="main--payable">
        <div className="navigation-indicator">
          <IoMdHome /> / Customers
        </div>

        {customerAllTrans ? (
          <CustomerTransAll
            customerID={clickedCustomerID}
            setCustomerAllTrans={setCustomerAllTrans}
          />
        ) : (
          <div className="table-cont">
            <div className="table--optns">
              <p>Customers</p>

              <div className="table-box">
                <div className="search-container">
                  <MdSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search Customer"
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
                  <th>Name</th>
                  <th>E-Mail</th>
                  <th>Phone No</th>
                  <th>GST No</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Company_Name}</td>
                    <td>{row.Email}</td>
                    <td>{row.Mobile_No}</td>
                    <td>{row.GST_No}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
                    {
                      required: true,
                      message: "Please enter account number",
                    },
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
                  rules={[{ required: true, message: "Please enter City" }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="CzipCode"
                  label="Zip Code"
                  rules={[{ required: true, message: "Please enter Zip code" }]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Customer
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Payable;
