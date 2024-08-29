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
import VendorTransAll from "../Components/vendorTransAll/vendorTransAll";
const { Option } = Select;
const ledgerData = [
  {
    vendorName: "ABC Pvt Ltd",
    GSTNo: "GSTIN1234567890",
    PAN: "ABCDE1234F",
    Address: "1234, Elm Street, Springfield, IL, 62704",
    ContactNo: "9876543210",
  },
  {
    vendorName: "XYZ Corporation",
    GSTNo: "GSTIN0987654321",
    PAN: "XYZAB9876C",
    Address: "5678, Oak Avenue, Gotham, NY, 10001",
    ContactNo: "8765432109",
  },
  {
    vendorName: "Global Enterprises",
    GSTNo: "GSTIN1122334455",
    PAN: "GHJLM9876D",
    Address: "12, Maple Lane, Metropolis, CA, 90210",
    ContactNo: "7654321098",
  },
  {
    vendorName: "Innovative Solutions",
    GSTNo: "GSTIN2233445566",
    PAN: "MNOPQ1234E",
    Address: "89, Pine Road, Star City, FL, 33101",
    ContactNo: "6543210987",
  },
  {
    vendorName: "Tech World Inc.",
    GSTNo: "GSTIN3344556677",
    PAN: "QRSTU5678F",
    Address: "47, Cedar Boulevard, Central City, TX, 75001",
    ContactNo: "5432109876",
  },
  {
    vendorName: "Alpha Industries",
    GSTNo: "GSTIN4455667788",
    PAN: "VWXYZ2345G",
    Address: "32, Birch Avenue, Coast City, OR, 97301",
    ContactNo: "4321098765",
  },
  {
    vendorName: "NextGen Technologies",
    GSTNo: "GSTIN5566778899",
    PAN: "LMNOP6789H",
    Address: "58, Redwood Street, Keystone City, WA, 98001",
    ContactNo: "3210987654",
  },
];

const Vendor = () => {
  const [vendorAllTrans, setvendorAllTrans] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // data of specific customer/
  const [clickedVendorID, setClickedVendorID] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  //
  const [isAddNewModalVisible, setIsAddNewModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = ledgerData.filter((row) => {
    return row.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleRowClick = (row) => {
    handleFetchAccountDetails(row.AccountCode);
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
    await handleFetch(); // Refresh data after adding new entry
  };

  const handleFetch = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/vendor/allVendors`
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
        `${process.env.REACT_APP_BACKEND_URL}api/Vendor/addVendor`,
        values
      );
      toast.success("Data is added...", { position: "top-center" });
    } catch (error) {
      console.log(error);
      // toast.error("Error while adding the data...", { position: "top-center" });
    }
  };

  const handleFetchAccountDetails = async (AccountCode) => {
    try {
      // console.log("Account code:.............", AccountCode);
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/Payable/payable/${AccountCode}`
      );
      setSelectedRow(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      // toast.error("Error while fetching the transaction details...", {
      //   position: "top-center",
      // });
    }
  };
  const handleVendorClick = (ac) => {
    setClickedVendorID(ac);
    setvendorAllTrans(true);
  };
  const handleBackBtn = () => {
    setvendorAllTrans(false);
  };
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="acc-payable--section">
      <Dashboard />
      <div className="main--payable">
        <div className="navigation-indicator">
          <IoMdHome /> / Vendors
        </div>
        {vendorAllTrans ? (
          <VendorTransAll
            vendorID={clickedVendorID}
            setvendorAllTrans={setvendorAllTrans}
          />
        ) : (
          <div className="table-cont">
            <div className="table--optns">
              <p>Vendors</p>
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
                  <th>Vendor Name</th>
                  <th>GST No</th>
                  <th>PAN no</th>
                  <th> Address</th>
                  <th> Contact No</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      handleVendorClick(row.AccountCode);
                    }}
                  >
                    <td>{row.vendorName}</td>
                    <td>{row.GSTNo}</td>
                    <td>{row.PAN}</td>
                    <td>{row.Address}</td>
                    <td>{row.ContactNo}</td>
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
              {selectedRow.PaymentStatus === "Paid" && (
                <>
                  <p>Vendors Account No: {selectedRow.AccountCode}</p>
                  <p>Category: {selectedRow.Category}</p>
                  <p>Transaction Date: {selectedRow.PaymentDate}</p>
                  <p>Invoice Date: {selectedRow.InvoiceDate}</p>
                  <p>Payment Mode: {selectedRow.PaymentMode}</p>
                </>
              )}
              {selectedRow.PaymentStatus === "Unpaid" && (
                <>
                  <p>Due Date: {selectedRow.DueDate}</p>
                  <p>Amount Due: {selectedRow.AmountDue}</p>
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
                  name="VendorName"
                  label="Vendor Name"
                  rules={[
                    { required: true, message: "Please enter vendor name" },
                  ]}
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
                  name="ContactNumber"
                  label="Contact Number"
                  rules={[
                    { required: true, message: "Please enter contact number" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="EmailAddress"
                  label="Email Address"
                  rules={[
                    { required: true, message: "Please enter email address" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="abc" style={{ display: "flex", gap: "3rem" }}>
              <div style={{ flexGrow: "1" }}>
                <Form.Item
                  name="BillingAddress"
                  label="Billing Address"
                  rules={[
                    { required: true, message: "Please enter billing address" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div>
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

export default Vendor;
