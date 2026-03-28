import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Location from "./Components/Location";
const Profile = ({ setLogged }) => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedApt, setSelectedApt] = useState(null);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const thankYouNotes = [
    "Thanks for visiting! We loved seeing your furry friend today! 🐾",
    "Your pet was such a good patient! Hope to see you again soon. ✨",
    "Thank you for trusting us with your pet's care today! ❤️",
    "Another wonderful session finished! Give your pet a treat from us! 🦴",
    "It was a pleasure serving you and your pet today. Stay paw-some! 🐶",
    "Thanks for stopping by! We hope your pet feels refreshed and happy! 🐱"
  ];

 useEffect(() => {
  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLogged(false);
      navigate("/");
      return;
    }

    const headers = { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    try {
      // Fetch User Info
      const res = await fetch("http://localhost:5000/api/auth/profile", { headers });
      if (!res.ok) throw new Error(`Profile Error: ${res.status}`);
      const userData = await res.json();
      setUser(userData);

      // Fetch Appointments
      const appointResp = await fetch("http://localhost:5000/api/auth/receipt", { headers });
      if (!appointResp.ok) throw new Error(`Receipt Error: ${appointResp.status}`);
      
      const aptData = await appointResp.json();
      
      // LOG THIS to see your actual data structure in the console!
      console.log("Fetched Appointment Data:", aptData);

      // Extract data safely based on your backend structure
      const actualData = aptData.success ? aptData.data : aptData;

      if (Array.isArray(actualData)) {
        const normalized = actualData.map(a => ({
          ...a,
          // Handle cases where preferredDate might be missing or malformed
          preferredDate: a.preferredDate ? new Date(a.preferredDate).toISOString().split('T')[0] : "No Date",
          thanksNote: thankYouNotes[Math.floor(Math.random() * thankYouNotes.length)]
        }));
        setAppointments(normalized);
      }
    } catch (err) {
      console.error("Critical Fetch Error:", err.message);
      // Optional: alert("Session expired. Please log in again.");
    }
  };
  
  fetchProfileData();
}, [navigate, setLogged]);
  const getSevenDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const tempDate = new Date();
      tempDate.setDate(today.getDate() + i);
      
      const y = tempDate.getFullYear();
      const m = String(tempDate.getMonth() + 1).padStart(2, '0');
      const d = String(tempDate.getDate()).padStart(2, '0');
      const dateString = `${y}-${m}-${d}`; 
      
      const dayName = tempDate.toLocaleDateString('en-US', { weekday: 'short' });
      const isBooked = appointments.some(app => app.preferredDate === dateString);

      days.push({ dayName, dayNum: tempDate.getDate(), dateString, isBooked });
    }
    return days;
  };

  const weekDays = getSevenDays();

  const handleFeedbackSubmit = () => {
    alert("Feedback sent!");
    setShowFeedback(false);
    setFeedback("");
  };

  if (!user) return <div className="sec"><h2>Loading Profile...</h2></div>;

  const todayStr = new Date().toISOString().split('T')[0];
  const upcoming = appointments.filter(a => a.preferredDate >= todayStr);
  const finished = appointments.filter(a => a.preferredDate < todayStr);

  return (
    
    <div className="profile-page-container">
      <div className="profile-banner">
        <div className="banner-text">
          <h2>Welcome, {user.name}</h2>
          <p>You have {upcoming.length} upcoming sessions.</p>
        </div>
        <div className="banner-right">
          <button
            className="logout-top-btn"
            onClick={() => {
              localStorage.clear();
              setLogged(false);
              navigate("/");
            }}
          >
            Logout
          </button>
          <img src="/Images/miss.png" alt="Profile" className="banner-avatar" />
        </div>
      </div>

      <div className="profile-vertical-layout">
        {/* Weekly Schedule */}
        <div className="content-card">
          <h3>Weekly Schedule</h3>
          <div className="seven-day-calendar">
            {weekDays.map((day, i) => (
              <div
                key={i}
                className={`day-slot ${day.isBooked ? "booked-dark" : ""}`}
              >
                <span className="day-name">{day.dayName}</span>
                <span className="day-number">{day.dayNum}</span>
                {day.isBooked && <div className="booked-indicator-dot"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="upcoming-appointments-section">
          <h3>Upcoming Appointments</h3>
          <div className="upcoming-grid">
            {upcoming.length > 0 ? (
              upcoming.map((a, i) => (
                <div key={i} className="upcoming-card">
                  <div className="card-header">
                    <span className="time-badge">{a.preferredTime}</span>
                    <h4 className="apt-name">{a.petType} Appointment</h4>
                    <p className="apt-date">{a.preferredDate}</p>
                  </div>

                  <div className="appointment-details">
                    <p>
                      <strong>Owner:</strong> {a.ownerName}
                    </p>
                    <p className="status-text">Preparing for your visit...</p>
                  </div>

                  <div className="card-bottom">
                    <button
                      className="reminder-btn"
                      onClick={() => alert("Reminder set!")}
                    >
                      Set Reminder
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-apt">No upcoming sessions scheduled.</p>
            )}
          </div>
        </div>

        {/* Finished History - Enhanced Styled Cards */}
        <div className="finished-history-section">
          <h3>Finished History</h3>
          <div className="finished-grid">
            {finished.length > 0 ? (
              finished.map((a, i) => (
                <div key={i} className="finished-card">
                  <div className="card-top">
                    <h4 className="apt-name">{a.petType} Appointment</h4>
                    <p className="apt-date">{a.preferredDate}</p>
                  </div>

                  <div className="thanks-note">{a.thanksNote}</div>

                  <div className="card-bottom">
                    <button
                      className="feedback-btn"
                      onClick={() => {
                        setSelectedApt(a);
                        setShowFeedback(true);
                      }}
                    >
                      Leave Feedback
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-apt">No past history found yet.</p>
            )}
          </div>
        </div>
      </div>

      {showFeedback && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Feedback</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="How was the session?"
            />
            <div className="popup-btns">
              <button onClick={() => setShowFeedback(false)}>Close</button>
              <button className="btn-submit" onClick={handleFeedbackSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;