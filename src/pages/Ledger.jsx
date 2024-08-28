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
      date: "01-08-2024",
      AccNo: "ACC-102",
      invoiceNo: "INV-001",
      Particulars: "payment to vendor vtsven1002",
      Debit: "20000",
      credit: "-",
      TDS: "0",
      GST: "-75.00",
      Settlement_value: "225000",
    },
    {
      date: "10-08-2024",
      AccNo: "ACC-104",
      invoiceNo: "INV-003",
      Particulars: "payment to vendor vtsven1004",
      Debit: "200000",
      credit: "",
      TDS: "10000",
      GST: "-100.00",
      Settlement_value: "290000",
    },
    {
      date: "15-08-2024",
      AccNo: "ACC-105",
      invoiceNo: "INV-004",
      Particulars: "refund from vendor vtsven1005",
      Debit: "",
      credit: "95000",
      TDS: "4750",
      GST: "-47.50",
      Settlement_value: "137750",
    },
    {
      date: "20-08-2024",
      AccNo: "ACC-106",
      invoiceNo: "INV-005",
      Particulars: "payment to vendor vtsven1006",
      Debit: "130000",
      credit: "",
      TDS: "6500",
      GST: "-65.00",
      Settlement_value: "188500",
    },
    {
      date: "25-08-2024",
      AccNo: "ACC-107",
      invoiceNo: "INV-006",
      Particulars: "refund from vendor vtsven1007",
      Debit: "",
      credit: "75000",
      TDS: "3750",
      GST: "-37.50",
      Settlement_value: "108750",
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
                <th>Date of Transaction</th>
                <th>Transaction Details</th>
                <th>Account No</th>
                <th>Invoice Number</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>TDS</th>
                <th>GST</th>
                <th>Net Settlement value</th>
              </tr>
            </thead>
            <tbody>
              {ledgerData.map((e, index) => (
                <tr key={index}>
                  <td>{e.date}</td>
                  <td>{e.Particulars}</td>

                  <td>{e.AccNo}</td>
                  <td>{e.invoiceNo}</td>
                  <td>{e.Debit}</td>
                  <td>{e.credit}</td>
                  <td>{e.TDS}</td>
                  <td>{e.GST}</td>
                  <td>{e.Settlement_value}</td>
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
