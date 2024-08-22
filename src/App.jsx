import Dashboard from "./Components/Dashboard.jsx";
import Payable from "./pages/Payable.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Payable" element={<Payable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
