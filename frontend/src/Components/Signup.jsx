import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({setLogged}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]= useState("");
  const [location,setLocation]= useState("");
  const navigate=useNavigate();
  const handlesubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      location,
    }),
  });

    let data;
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.warn("Non-JSON signup response:", text);
      data = text ? { message: text } : {};
    }
    
    if (!res.ok) {
      alert(data.message || "Signup failed");
    } else {
      setLogged(true);
      localStorage.setItem("token", data.token);
      console.log("Signup success:", data.user);
      navigate("/");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

  return (
    <form onSubmit={handlesubmit}>
        <div className="Login">
        <div className="outerbox">
        <h2>Signup</h2>
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
      <input
      type="name"
      placeholder="name"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
    <input
    type="location"
    placeholder="Location"
    value={location}
    onChange={(e)=>setLocation(e.target.value)}
    />
      <button type="submit">Signup</button>
     
    </div>
    </div>
    </form>
  );
};

export default Signup;
