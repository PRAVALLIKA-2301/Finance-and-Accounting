import Dashboard from "./Components/Dashboard.jsx";
import Payable from "./pages/Payable.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Receivable from "./pages/Receivable.jsx";
import Ledger from "./pages/Ledger.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Payable" element={<Payable />} />
          <Route path="/Receivable" element={<Receivable />} />
          <Route path="/ledger" element={<Ledger />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
