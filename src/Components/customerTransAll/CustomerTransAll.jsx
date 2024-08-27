import axios from "axios";
import "./CustomerTransAll.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io"; // Import the IoMdAdd icon if it's used
// import { MdSearch } from "react-icons/md"; // Uncomment if you use the search icon

function CustomerTransAll({ setCustomerAllTrans, customerID }) {
  // Store customer all transactions
  const [customerTransactions, setCustomerTransactions] = useState(null);

  const handleBackBtn = () => {
    setCustomerAllTrans(false);
  };

  useEffect(() => {
    const handleFetchAccountDetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/receivable/accountDetails/${customerID}`
        );
        setCustomerTransactions(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("Error in fetching account details: ", error);
        toast.error("Error while fetching account details.", {
          position: "top-center",
        });
      }
    };

    // Call the function to fetch account details
    if (customerID) {
      handleFetchAccountDetails();
    }
  }, [customerID]);

  return (
    <div className="customer-all-transactions">
      <div className="table-cont">
        <div className="table--optns">
          <p>Customers</p>

          <div className="table-box">
            <div className="search-container">
              {/* Uncomment the search input if needed */}
              {/* <MdSearch className="search-icon" /> */}
              {/* <input
                type="text"
                placeholder="Search Customer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              /> */}
            </div>
            <div>
              <button>
                <IoMdAdd className="add-icon" />
                Add new
              </button>
            </div>
          </div>
        </div>

        {customerTransactions ? (
          <table>
            <thead>
              <tr>
                <th>Account Code</th>
                <th>Amount Receivable</th>
                <th>Category</th>
                <th>Due Date</th>
                <th>Invoice Date</th>
                <th>Invoice Number</th>
                <th>Payment Date</th>
                <th>Payment Mode</th>
                <th>Payment Status</th>
                <th>UTR</th>
              </tr>
            </thead>
            <tbody>
              {customerTransactions.map((row, index) => (
                <tr key={index}>
                  <td>{row.AccountCode || "-"}</td>
                  <td>{row.AmountReceivable || "-"}</td>
                  <td>{row.Category || "-"}</td>
                  <td>{row.DueDate || "-"}</td>
                  <td>{row.InvoiceDate || "-"}</td>
                  <td>{row.InvoiceNumber || "-"}</td>
                  <td>{row.PaymentDate || "-"}</td>
                  <td>{row.PaymentMode || "-"}</td>
                  <td>{row.PaymentStatus || "-"}</td>
                  <td>{row.UTR || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading transactions...</p>
        )}
      </div>
      <p onClick={handleBackBtn} className="back-btn">
        Back
      </p>
      <ToastContainer />
    </div>
  );
}

export default CustomerTransAll;
