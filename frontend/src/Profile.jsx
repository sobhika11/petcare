import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user,setUser] = useState(null);

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
      console.log(token);
      setUser(data);
    };
    console.log(user);
    fetchProfile();
  }, []);

  if(!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h3>Profile</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
    </div>
  );
};

export default Profile;
