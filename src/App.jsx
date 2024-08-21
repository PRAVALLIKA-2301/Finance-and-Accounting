import Hero from "./Components/Hero.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Hero" element={<Hero />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
