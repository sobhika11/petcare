import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.warn("Non-JSON login response:", text);
        data = text ? { message: text } : {};
      }

      if (!res.ok) {
        alert(data.message || "Login failed");
      } else {
        setLogged(true);
        localStorage.setItem("token", data.token);
        console.log("Login success:", data.user);
        navigate("/");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to connect to server");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Section: Form */}
        <div className="login-left">
          <form onSubmit={handlesubmit} className="login-form">
            <h2 className="login-title">Welcome Back!!</h2>
            
            <div className="input-group">
              <span className="input-icon">@</span>
              <input
                type="email"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
            </div>

            {/* <div className="forgot-link">
              <a href="/forgot-password">Forgot Password?</a>
            </div> */}

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-icon">G</button>
              <button type="button" className="social-icon">f</button>
              <button type="button" className="social-icon"></button>
            </div>

            <p className="signup-text">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>

        {/* Right Section: Illustration */}
        <div className="login-right">
          <div className="arch-background" ><img href="Images/login_pic.jpg" /></div>
          <img 
            src="../../public/Images/login_pic.jpg" 
            alt="3D Illustration" 
            className="illustration-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;