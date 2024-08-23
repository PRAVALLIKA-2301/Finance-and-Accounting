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
    {
      AccNo: "ACC-101",
      Transaction: "payment to vendor",
      date: "22-08-2024",
      Debit: 20000,
      Credit: 0,
    },
    {
      AccNo: "ACC-102",
      Transaction: "Both",
      date: "21-08-2024",
      Debit: 5000,
      Credit: 3000,
    },
    {
      AccNo: "ACC-103",
      Transaction: "payment from customer",
      date: "20-08-2024",
      Debit: 0,
      Credit: 4000,
    },
    {
      AccNo: "ACC-104",
      Transaction: "Both",
      date: "19-08-2024",
      Debit: 4000,
      Credit: 40000,
    },
    {
      AccNo: "ACC-105",
      Transaction: "payment to vendor",
      date: "18-08-2024",
      Debit: 20000,
      Credit: 0,
    },
    {
      AccNo: "ACC-106",
      Transaction: "payment to vendor",
      date: "17-08-2024",
      Debit: 6000,
      Credit: 0,
    },
    {
      AccNo: "ACC-107",
      Transaction: "payment from customer",
      date: "16-08-2024",
      Debit: 0,
      Credit: 100000,
    },
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
    if (dates) {
      const [start, end] = dates;
      setStartDate(start ? start.toDate() : null);
      setEndDate(end ? end.toDate() : null);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleGetDetails = () => {
    if (startDate && endDate && selectedAccount) {
      // Set hours for start and end dates
      const formattedStartDate = new Date(startDate);
      formattedStartDate.setHours(0, 0, 0, 0);

      const formattedEndDate = new Date(endDate);
      formattedEndDate.setHours(23, 59, 59, 999);

      console.log("Formatted Start Date:", formattedStartDate.toISOString());
      console.log("Formatted End Date:", formattedEndDate.toISOString());

      const filteredData = ledgerData.filter((item) => {
        const itemDate = parseDate(item.date);
        console.log("Item Date:", itemDate.toISOString());

        return (
          item.AccNo === selectedAccount.AccNo &&
          itemDate >= formattedStartDate &&
          itemDate <= formattedEndDate
        );
      });

      console.log("Filtered Data:", filteredData);

      const totalDebits = filteredData.reduce(
        (acc, item) => acc + item.Debit,
        0
      );
      const totalCredits = filteredData.reduce(
        (acc, item) => acc + item.Credit,
        0
      );

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
          <DatePicker.RangePicker
            onChange={handleDateChange}
            value={[
              startDate ? moment(startDate) : null,
              endDate ? moment(endDate) : null,
            ]}
          />
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
