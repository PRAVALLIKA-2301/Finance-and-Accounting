import React, { useState } from "react";
import Dashboard from "../Components/Dashboard";
import { Modal, DatePicker, Input, Space, Button } from "antd";
import { IoMdHome } from "react-icons/io";
import moment from "moment";

const Ledger = () => {
  const [searchAcc, setSearchAcc] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [debitSum, setDebitSum] = useState(0);
  const [creditSum, setCreditSum] = useState(0);
  const [noTransactions, setNoTransactions] = useState(false);

  const ledgerData = [
    { AccNo: "ACC-101", date: "22-08-2024", Debit: 20000, Credit: 30000 },
    { AccNo: "ACC-102", date: "21-08-2024", Debit: 5000, Credit: 3000 },
    { AccNo: "ACC-103", date: "20-08-2024", Debit: 3000, Credit: 4000 },
    { AccNo: "ACC-104", date: "19-08-2024", Debit: 4000, Credit: 40000 },
    { AccNo: "ACC-105", date: "18-08-2024", Debit: 20000, Credit: 40000 },
    { AccNo: "ACC-106", date: "17-08-2024", Debit: 6000, Credit: 2000 },
    { AccNo: "ACC-107", date: "16-08-2024", Debit: 3000, Credit: 100000 },
  ];

  const handleSearch = (value) => {
    const account = ledgerData.find((item) => item.AccNo.endsWith(value));
    if (account) {
      setSelectedAccount(account);
      setIsModalVisible(true);
      resetModalData();
    }
  };

  const resetModalData = () => {
    setDebitSum(0);
    setCreditSum(0);
    setNoTransactions(false);
    setStartDate(null);
    setEndDate(null);
  };

  const handleDateChange = (dates) => {
    setStartDate(dates ? dates[0] : null);
    setEndDate(dates ? dates[1] : null);
  };

  const handleGetDetails = () => {
    if (startDate && endDate && selectedAccount) {
      // Directly use moment without reformatting startDate and endDate
      const formattedStartDate = moment(startDate);
      const formattedEndDate = moment(endDate);
  
      console.log("Formatted Start Date:", formattedStartDate.format("DD-MM-YYYY"));
      console.log("Formatted End Date:", formattedEndDate.format("DD-MM-YYYY"));
  
      // Filtering ledger data based on the account number and date range
      const filteredData = ledgerData.filter((item) => {
        const itemDate = moment(item.date, "DD-MM-YYYY");
        console.log("Item Date:", itemDate.format("DD-MM-YYYY"));
  
        // Check if the item's date falls within the selected range
        return (
          item.AccNo === selectedAccount.AccNo &&
          itemDate.isBetween(formattedStartDate, formattedEndDate, "days", "[]")
        );
      });
  
      console.log("Filtered Data:", filteredData);
      const totalDebits = filteredData.reduce((acc, item) => acc + item.Debit, 0);
      const totalCredits = filteredData.reduce((acc, item) => acc + item.Credit, 0);
  
      setDebitSum(totalDebits);
      setCreditSum(totalCredits);
      setNoTransactions(filteredData.length === 0);
    } else {
      setDebitSum(0);
      setCreditSum(0);
      setNoTransactions(true);
    }
  };
  

  return (
    <div className="acc-ledger-section">
      <Dashboard />
      <div className="main--payable">
        <div className="navigation-indicator">
          <IoMdHome /> / Ledger
        </div>

        <div className="table-cont">
          <div className="table--optns">
            <p>Accounts</p>
            <div className="table-search">
              <Input.Search
                placeholder="Enter Last 3 Digits of Account No"
                enterButton="Search"
                onSearch={handleSearch}
                value={searchAcc}
                onChange={(e) => setSearchAcc(e.target.value)}
              />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Account No</th>
                <th>Date</th>
                <th>Debits</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {ledgerData.map((e, index) => (
                <tr key={index}>
                  <td>{e.AccNo}</td>
                  <td>{e.date}</td>
                  <td>{e.Debit.toLocaleString()}</td>
                  <td>{e.Credit.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title={`Account: ${selectedAccount?.AccNo}`}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          resetModalData();
        }}
        footer={null}
      >
        <Space direction="vertical" size={12}>
          <p>Select Date Range:</p>
          <DatePicker.RangePicker onChange={handleDateChange} />
          <Button
            type="primary"
            onClick={handleGetDetails}
            disabled={!startDate || !endDate}
          >
            Get Details
          </Button>
        </Space>

        {noTransactions ? (
          <p>No transactions</p>
        ) : (
          <div className="summary">
            <p>Total Debits: {debitSum.toLocaleString()}</p>
            <p>Total Credits: {creditSum.toLocaleString()}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Ledger;
