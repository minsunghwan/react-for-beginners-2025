import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./routes/MainPage";
import Detail from "./routes/Detail";
import "./css/App.css";

function App() {
  return (
    <div className="appRoot">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/movies/:id" element={<Detail />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
