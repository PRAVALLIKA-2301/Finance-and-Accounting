// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form, Input, DatePicker, Select } from "antd";
// import Dashboard from "../Components/Dashboard";
// import "../pages/Payable.css";
// import { IoMdHome } from "react-icons/io";
// import { IoMdAdd } from "react-icons/io";
// import { ToastContainer, toast } from "react-toastify";
// import moment from "moment";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { MdSearch } from "react-icons/md";

// const { Option } = Select;

// const Payable = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [isAddNewModalVisible, setIsAddNewModalVisible] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState("Paid");
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [ordersData, setOrdersData] = useState([]);
//   const [transactionsData, setTransactionsData] = useState([]);

//   const handleRowClick = (row) => {
//     setSelectedRow(row);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setSelectedRow(null);
//   };

//   const handleNewClick = () => {
//     setIsAddNewModalVisible(true);
//   };

//   const handleAddNewCancel = () => {
//     setIsAddNewModalVisible(false);
//   };

//   const handleAddNewFinish = async (values) => {
//     const formattedInvoiceDate = new Date(values.InvoiceDate);
//     formattedInvoiceDate.setHours(23, 59, 59, 999);
//     values.InvoiceDate = formattedInvoiceDate.toLocaleDateString("en-CA");
//     if (values.PaymentStatus === "Paid") {
//       const formattedTransactionDate = new Date(values.PaymentDate);
//       formattedTransactionDate.setHours(23, 59, 59, 999);
//       values.PaymentDate = formattedTransactionDate;
//     } else if (values.PaymentStatus === "Unpaid") {
//       const formattedDueDate = new Date(values.DueDate);
//       formattedDueDate.setHours(23, 59, 59, 999);
//       values.DueDate = formattedDueDate.toLocaleDateString("en-CA");
//     }
//     await handleSubmit(values);
//     setIsAddNewModalVisible(false);
//     await handleFetch();
//   };

//   const handlePaymentStatusChange = (value) => {
//     setPaymentStatus(value);
//   };

//   const handleFetch = async () => {
//     try {
//       // Fetching both transactions and orders data
//       const [transactionsRes, ordersRes] = await Promise.all([
//         axios.get(
//           "https://b2b-backend-uvpc.onrender.com/user/get-transactions"
//         ),
//         axios.get("https://b2b-backend-uvpc.onrender.com/user/getorders"),
//       ]);

//       const transactionsData = transactionsRes.data;
//       const ordersData = ordersRes.data;

//       // Create a map for orders data
//       const ordersMap = new Map();
//       ordersData.forEach((order) => {
//         ordersMap.set(order.order_id, order);
//       });

//       // Merge the data
//       const mergedData = transactionsData
//         .map((transaction) => {
//           const order = ordersMap.get(transaction.order_id);
//           if (order) {
//             const dueDate = new Date(order.date_of_order);
//             dueDate.setDate(dueDate.getDate() + 10);

//             return {
//               CustomerName: order.companyname,
//               AccountNumber: transaction.accountId,
//               InvoiceNumber: `INV${transaction.order_id.replace("B2BHUB", "")}`,
//               InvoiceDate: order.date_of_order,
//               Amount: transaction.amount,
//               DueDate: dueDate.toLocaleDateString("en-CA"),
//               PaymentStatus:
//                 order.payment_status === 1
//                   ? order.payment_verified === 1
//                     ? "Paid"
//                     : "In Progress"
//                   : "Pending",
//             };
//           }
//           return null;
//         })
//         .filter((item) => item !== null);

//       setData(mergedData);
//       setOrdersData(ordersData);
//       setTransactionsData(transactionsData);
//       console.log("Data fetched and merged successfully:", mergedData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Error while fetching....", { position: "top-center" });
//     }
//   };

//   const handleSubmit = async (values) => {
//     try {
//       console.log(values);
//       const res = await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}api/receivable/addReceivable`,
//         values
//       );

//       toast.success("Details added ...", { position: "top-center" });
//     } catch (error) {
//       console.log(error);
//       toast.error("Error while adding the data...", { position: "top-center" });
//     }
//   };

//   useEffect(() => {
//     handleFetch();
//   }, []);

//   return (
//     <div className="acc-payable--section">
//       <Dashboard />
//       <div className="main--payable">
//         <div className="navigation-indicator">
//           <IoMdHome /> / Receivable
//         </div>

//         <div className="table-cont">
//           <div className="table--optns">
//             <p>Debits</p>
//             <div className="table-box">
//               <div className="search-container">
//                 <MdSearch className="search-icon" />
//                 <input
//                   type="text"
//                   placeholder="Search Vendor"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="search-input"
//                 />
//               </div>
//               <div>
//                 <button onClick={handleNewClick}>
//                   <IoMdAdd className="add-icon" />
//                   Add new
//                 </button>
//               </div>
//             </div>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>Customer Name</th>
//                 <th>Account Number</th>
//                 <th>Invoice Number</th>
//                 <th>Invoice Date</th>
//                 <th>Amount</th>
//                 <th>Due Date</th>
//                 <th>Payment Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, index) => (
//                 <tr key={index} onClick={() => handleRowClick(row)}>
//                   <td>{row.CustomerName}</td>
//                   <td>{row.AccountNumber}</td>
//                   <td>{row.InvoiceNumber}</td>
//                   <td>{row.InvoiceDate}</td>
//                   <td>{row.Amount}</td>
//                   <td>{row.DueDate}</td>
//                   <td>{row.PaymentStatus}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <Modal
//           title="Transaction Details"
//           visible={isModalVisible}
//           onCancel={handleCancel}
//           footer={[
//             <Button key="close" onClick={handleCancel}>
//               Close
//             </Button>,
//           ]}
//         >
//           {selectedRow && (
//             <div>
//               <p>Account No: {selectedRow.AccountNumber}</p>
//               <p>Invoice Date: {selectedRow.InvoiceDate}</p>
//               <p>Amount: {selectedRow.Amount}</p>
//               <p>Due Date: {selectedRow.DueDate}</p>
//               <p>Payment Status: {selectedRow.PaymentStatus}</p>
//             </div>
//           )}
//         </Modal>

//         <Modal
//           title="Add New Debit"
//           visible={isAddNewModalVisible}
//           onCancel={handleAddNewCancel}
//           footer={null}
//         >
//           <Form layout="vertical" onFinish={handleAddNewFinish}>
//             <div className="abc" style={{ display: "flex", gap: "3rem" }}>
//               <div style={{ flexGrow: "1" }}>
//                 <Form.Item
//                   name="Category"
//                   label="Customer Name"
//                   rules={[{ required: true, message: "Please enter category" }]}
//                 >
//                   <Input />
//                 </Form.Item>
//               </div>
//               <div style={{ flexGrow: "1" }}>
//                 <Form.Item
//                   name="AccountCode"
//                   label="Account No"
//                   rules={[
//                     { required: true, message: "Please enter account number" },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//               </div>
//             </div>
//             <div className="abc" style={{ display: "flex", gap: "3rem" }}>
//               <div style={{ flexGrow: "1" }}>
//                 <Form.Item
//                   name="InvoiceNumber"
//                   label="Invoice No"
//                   rules={[
//                     { required: true, message: "Please enter invoice number" },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//               </div>
//               <div style={{ flexGrow: "1" }}>
//                 <Form.Item
//                   name="InvoiceDate"
//                   label="Invoice Date"
//                   rules={[
//                     { required: true, message: "Please select invoice date" },
//                   ]}
//                 >
//                   <DatePicker />
//                 </Form.Item>
//               </div>
//             </div>
//             <div className="abc" style={{ display: "flex", gap: "3rem" }}>
//               <div style={{ flexGrow: "1" }}>
//                 <Form.Item
//                   name="PaymentStatus"
//                   label="Payment Status"
//                   rules={[
//                     { required: true, message: "Please select payment status" },
//                   ]}
//                 >
//                   <Select onChange={handlePaymentStatusChange}>
//                     <Option value="Paid">Paid</Option>
//                     <Option value="Unpaid">Unpaid</Option>
//                   </Select>
//                 </Form.Item>
//               </div>
//               {paymentStatus === "Paid" && (
//                 <div style={{ flexGrow: "1" }}>
//                   <Form.Item
//                     name="PaymentMode"
//                     label="Payment Mode"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please select payment mode",
//                       },
//                     ]}
//                   >
//                     <Select>
//                       <Option value="Cash">Cash</Option>
//                       <Option value="Credit Card">Credit Card</Option>
//                       <Option value="Bank Transfer">Bank Transfer</Option>
//                     </Select>
//                   </Form.Item>
//                 </div>
//               )}
//             </div>
//             {paymentStatus === "Paid" && (
//               <div className="abc" style={{ display: "flex", gap: "3rem" }}>
//                 <div style={{ flexGrow: "1" }}>
//                   <Form.Item
//                     name="PaymentDate"
//                     label="Transaction Date"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please select transaction date",
//                       },
//                     ]}
//                   >
//                     <DatePicker />
//                   </Form.Item>
//                 </div>
//                 <div style={{ flexGrow: "1" }}>
//                   <Form.Item
//                     name="UTR"
//                     label="UTR"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please enter UTR Number",
//                       },
//                     ]}
//                   >
//                     <Input />
//                   </Form.Item>
//                 </div>
//                 <div style={{ flexGrow: "1" }}>
//                   <Form.Item
//                     name="AmountReceivable"
//                     label="Amount Paid"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please enter amount total amount",
//                       },
//                     ]}
//                   >
//                     <Input />
//                   </Form.Item>
//                 </div>
//               </div>
//             )}
//             {paymentStatus === "Unpaid" && (
//               <div className="abc" style={{ display: "flex", gap: "3rem" }}>
//                 <div style={{ flexGrow: "1" }}>
//                   <Form.Item
//                     name="AmountReceivable"
//                     label="Due Amount"
//                     rules={[
//                       { required: true, message: "Please enter due amount" },
//                     ]}
//                   >
//                     <Input />
//                   </Form.Item>
//                 </div>
//                 <div style={{ flexGrow: "1" }}>
//                   <Form.Item
//                     name="DueDate"
//                     label="Due Date"
//                     rules={[
//                       { required: true, message: "Please select due date" },
//                     ]}
//                   >
//                     <DatePicker />
//                   </Form.Item>
//                 </div>
//               </div>
//             )}

//             <div style={{ textAlign: "center" }}>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </div>
//           </Form>
//         </Modal>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Payable;

import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, DatePicker, Select } from "antd";
import Dashboard from "../Components/Dashboard";
import "../pages/Payable.css";
import { IoMdHome } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
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
  const [ordersData, setOrdersData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);

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
    const formattedInvoiceDate = new Date(values.InvoiceDate);
    formattedInvoiceDate.setHours(23, 59, 59, 999);
    values.InvoiceDate = formattedInvoiceDate.toLocaleDateString("en-CA");
    if (values.PaymentStatus === "Paid") {
      const formattedTransactionDate = new Date(values.PaymentDate);
      formattedTransactionDate.setHours(23, 59, 59, 999);
      values.PaymentDate = formattedTransactionDate;
    } else if (values.PaymentStatus === "Unpaid") {
      const formattedDueDate = new Date(values.DueDate);
      formattedDueDate.setHours(23, 59, 59, 999);
      values.DueDate = formattedDueDate.toLocaleDateString("en-CA");
    }
    await handleSubmit(values);
    setIsAddNewModalVisible(false);
    await handleFetch();
  };

  const handlePaymentStatusChange = (value) => {
    setPaymentStatus(value);
  };

  const handleFetch = async () => {
    try {
      // Fetching both transactions and orders data
      const [transactionsRes, ordersRes] = await Promise.all([
        axios.get(
          "https://b2b-backend-uvpc.onrender.com/user/get-transactions"
        ),
        axios.get("https://b2b-backend-uvpc.onrender.com/user/getorders"),
      ]);

      const transactionsData = transactionsRes.data;
      const ordersData = ordersRes.data;

      // Create a map for transactions data by order_id
      const transactionsMap = new Map();
      transactionsData.forEach((transaction) => {
        transactionsMap.set(transaction.order_id, transaction);
      });

      // Prepare the merged data
      const mergedData = ordersData.map((order) => {
        const transaction = transactionsMap.get(order.order_id);
        const dueDate = new Date(order.date_of_order);
        dueDate.setDate(dueDate.getDate() + 10);

        return {
          CustomerName: order.companyname,
          AccountNumber: transaction ? transaction.accountId : "N/A",
          InvoiceNumber: `INV${order.order_id.replace("B2BHUB", "")}`,
          InvoiceDate: order.date_of_order,
          Amount: transaction ? transaction.amount : "N/A",
          DueDate: dueDate.toLocaleDateString("en-CA"),
          PaymentStatus:
            order.payment_status === 1
              ? order.payment_verified === 1
                ? "Paid"
                : "In Progress"
              : "Pending",
        };
      });

      setData(mergedData);
      setOrdersData(ordersData);
      setTransactionsData(transactionsData);
      console.log("Data fetched and merged successfully:", mergedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error while fetching....", { position: "top-center" });
    }
  };

  const handleSubmit = async (values) => {
    try {
      console.log(values);
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
                <th>Customer Name</th>
                <th>Account Number</th>
                <th>Invoice Number</th>
                <th>Invoice Date</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} onClick={() => handleRowClick(row)}>
                  <td>{row.CustomerName}</td>
                  <td>{row.AccountNumber}</td>
                  <td>{row.InvoiceNumber}</td>
                  <td>{row.InvoiceDate}</td>
                  <td>{row.Amount}</td>
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
          {selectedRow && (
            <div>
              <p>Account No: {selectedRow.AccountNumber}</p>
              <p>Invoice Date: {selectedRow.InvoiceDate}</p>
              <p>Amount: {selectedRow.Amount}</p>
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
                  label="Customer Name"
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
                  name="Amount"
                  label="Amount"
                  rules={[{ required: true, message: "Please enter amount" }]}
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
