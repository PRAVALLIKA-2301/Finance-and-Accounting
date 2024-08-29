// import Dashboard from "./Components/Dashboard.jsx";
import Payable from "./pages/Payable.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Receivable from "./pages/Receivable.jsx";
import Ledger from "./pages/Ledger.jsx";
import Vendors from "./pages/Vendors.jsx";
import Customer from "./pages/Customer.jsx";
import "./App.css";
import Dashboardd from "./pages/Dashboardd.jsx";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboardd />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/Payable" element={<Payable />} />
          <Route path="/Receivable" element={<Receivable />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/vendors" element={<Vendors />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
