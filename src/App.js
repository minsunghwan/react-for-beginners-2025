import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Header from "./header/Header";
import "./css/App.css";

function App() {
  return (
    <div className="appRoot">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
