import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ProductPage from "./ProductPage";
import ManufacturerPage from "./ManufacturerPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/" className="nav-button">
            Check Product
          </Link>
          <Link to="/manufacturer" className="nav-button">
            Manufacturer
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/manufacturer" element={<ManufacturerPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
