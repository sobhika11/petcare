import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Home from "./Home";
import AboutUs from "./AboutUs";
import Services from "./Services";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import Profile from "./Profile";
import DogGrooming from "./Components/DogGrooming.jsx";
import Popup  from "./Components/Popup.jsx";
import Receipt from "./Components/Receipt.jsx";
import "./index.css";

function App() {
  const [logged, setLogged] = useState(
  !!localStorage.getItem("token")
);
    
  return (
    <BrowserRouter>
    
      <header className="navbar">
        <div className="nav-left">
          <div className="logo">Petcare.go</div>

          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/about">About</Link>
            
          </nav>
        </div>

        <div className="nav-right">
        {
          logged ? (
          <>
          <Link to="/profile" className="profile"><img src="../public/Images/p.png" className="pimg"/></Link>
            
          </>):
          (
            <>
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/signup" className="btn login-btn">Sign-up</Link>
            
            </>
          )
        }
         {/* <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/signup" className="btn login-btn">Sign-up</Link>
          <Link to="/profile" className="profile"><img src="../public/Images/p.png" className="pimg"/></Link>
            */}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login setLogged={setLogged} />} />
        <Route path="/signup" element={<Signup setLogged={setLogged}/>} />
        <Route path="/profile" element={<Profile setLogged={setLogged} />} />
        <Route path="/dogGroom" element={<DogGrooming/>} />
        <Route path="/Popup" element={<Popup/>} />
        <Route path="/Receipt" element={<Receipt/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
