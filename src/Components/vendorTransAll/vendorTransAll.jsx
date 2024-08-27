import axios from "axios";
import "./vendorTransAll.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

function VendorTransAll({ setVendorAllTrans, vendorID }) {
  const [vendorTransactions, setVendorTransactions] = useState([]);
  console.log(vendorTransactions);
  const handleBackBtn = () => {
    setVendorAllTrans(false);
  };

  useEffect(() => {
    const handleFetchAccountDetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/receivable/accountDetails/${vendorID}`
        );
        const data = res.data;

        // Ensure data is an array, or set it to an empty array if not
        setVendorTransactions(data);

        console.log(data);
      } catch (error) {
        console.log("Error in fetching account details: ", error);
        toast.error("Error while fetching account details.", {
          position: "top-center",
        });
      }
    };

    if (vendorID) {
      handleFetchAccountDetails();
    }
  }, [vendorID]);

  return (
    <div className="vendor-all-transactions">
      <div className="table-cont">
        <div className="table--optns">
          <p>Vendors</p>
          <div className="table-box">
            <div className="search-container">
              {/* Add search input or other elements here */}
            </div>
            <div>
              <button>
                <IoMdAdd className="add-icon" />
                Add new
              </button>
            </div>
          </div>
        </div>

        {vendorTransactions ? (
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
              {vendorTransactions?.map((row, index) => (
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

export default VendorTransAll;
