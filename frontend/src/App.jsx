import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import AboutUs from "./AboutUs";
import Services from "./Services";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import Profile from "./Profile";
import DogGrooming from "./Components/DogGrooming.jsx";
import Popup from "./Components/Popup.jsx";
import Loaction from './Components/Location.jsx';
import Chatbot from './Components/Chatbot.jsx';
import DogTraining from './Components/DogTraining.jsx';
import TrainingHome from './Components/Training/TrainingHome.jsx';
import "./index.css";
import Features from "./Components/Features";
import HealthTracker from "./Components/HealthTracker";

function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [isChatOpen, setIsChatOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLogged(false);
    }
  }, []);
  return (
    <BrowserRouter>

      <header className="navbar">
        <div className="nav-left">
          <div className="logo"><h3>Petcare.go</h3></div>

          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/about">About</Link>

          </nav>
        </div>

        <div className="nav-right">
          {
            logged ? (
              <>
                <Link to="/profile" className="profile"><img src="../public/Images/p.png" className="pimg" /></Link>

              </>) :
              (
                <>
                  <Link to="/login" className="nav-btn nav-btn--ghost">Login</Link>
                  <Link to="/signup" className="nav-btn nav-btn--filled">Sign up</Link>
                </>
              )
          }
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login setLogged={setLogged} />} />
        <Route path="/signup" element={<Signup setLogged={setLogged} />} />
        <Route path="/profile" element={<Profile setLogged={setLogged} />} />
        <Route path="/dogGroom" element={<DogGrooming />} />
        <Route path="/Popup" element={<Popup />} />
        <Route path="/Location" element={<Loaction />} />
        <Route path="/dog-training" element={<DogTraining />} />
        <Route path="/training" element={<TrainingHome />} />
        <Route path="/features" element={<Features />} />
        <Route path="/health" element={<HealthTracker />} />
      </Routes>

      {/* Floating Chatbot Assistant */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
        {isChatOpen && (
          <div style={{ animation: 'fadeIn 0.3s ease', transformOrigin: 'bottom right' }}>
            <Chatbot />
          </div>
        )}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{
            width: '60px', height: '60px', borderRadius: '50%',
            backgroundColor: '#8b5e34', color: '#fff', border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          aria-label="Toggle Chat"
          title="Chat with PetCare Assistant"
        >
          🐾
        </button>
      </div>
    </BrowserRouter>
  );
}

export default App;
