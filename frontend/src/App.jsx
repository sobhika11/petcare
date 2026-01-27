import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import AboutUs from "./AboutUs";
import Services from "./Services";
import './index.css';
import React from "react";  
import Newsletter from "./Components/Newsletter.jsx";
function App() {
  return (
    <><BrowserRouter>
      <header className="header-div">
        <h2 style={{ marginRight: "-110px" }}>𝐏𝐞𝐭𝐂𝐚𝐫𝐞.𝐠𝐨 🐾</h2>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
