import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]= useState("");
  const [location,setLocation]= useState("");
  const navigate=useNavigate();
//   const handlesubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await fetch("http://localhost:5000/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password,name,location }),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       alert(data.message);
//     } else {
//       console.log("Signup success:", data.user);
//       navigate("/Home");
//     }
//   } catch (err) {
//     console.error("Error:", err);
//   }
// };

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
      <button>Signup</button>
    </div>
    </div>
    </form>
  );
};

export default Signup;
