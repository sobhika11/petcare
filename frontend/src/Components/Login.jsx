import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setLogged}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
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
   <form onSubmit={handlesubmit}>
     <div className="Login">
       <div className="outerbox">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
      <button type="button">Login using google</button>
    </div>
    </div>
   </form>
  );
};

export default Login;
