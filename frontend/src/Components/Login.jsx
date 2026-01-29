import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
//   const handlesubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       alert(data.message);
//     } else {
//       console.log("Login success:", data.user);
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

      <button>Login</button>
      <button>Login using google</button>
    </div>
    </div>
   </form>
  );
};

export default Login;
