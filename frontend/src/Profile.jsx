import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Profile = ({setLogged}) => {
  const [user,setUser] = useState(null);
  const Navigate=useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = await res.json();
      setUser(data);
    };
    console.log(user);
    fetchProfile();
  }, []);

  if(!user) return <h2>Loading...</h2>;
  
  return (
  <div className="profile-container">
    <div className="userprofile">

      <img
        src="../public/Images/miss.png"
        alt="profile"
        className="profile-avatar"
      />

      <h3>My Profile</h3>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Location:</strong> {user.location}</p>
      <p><strong>Appointment:</strong> {user.appointment || "None"}</p>

      <button onClick={()=>{
        localStorage.clear();
        setLogged(false);
        Navigate("/");
      }}>
        Log out
      </button>

    </div>
  </div>
);
};

export default Profile;
