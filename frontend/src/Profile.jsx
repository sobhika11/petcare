import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = ({ setLogged }) => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedApt, setSelectedApt] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const navigate = useNavigate();

  const thankYouNotes = [
    "Thanks for visiting! We loved seeing your furry friend today! 🐾",
    "Your pet was such a good patient! Hope to see you again soon. ✨",
    "Thank you for trusting us with your pet's care today! ❤️",
    "Another wonderful session finished! Give your pet a treat from us! 🦴",
    "It was a pleasure serving you and your pet today. Stay paw-some! 🐶",
    "Thanks for stopping by! We hope your pet feels refreshed and happy! 🐱",
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", { headers });
        if (!res.ok) throw new Error(`Profile Error: ${res.status}`);
        const userData = await res.json();
        setUser(userData);

        const appointResp = await fetch("http://localhost:5000/api/auth/receipt", { headers });
        if (!appointResp.ok) throw new Error(`Receipt Error: ${appointResp.status}`);
        const aptData = await appointResp.json();

        const actualData = aptData.success ? aptData.data : aptData;
        if (Array.isArray(actualData)) {
          const normalized = actualData.map((a) => ({
            ...a,
            preferredDate: a.preferredDate
              ? new Date(a.preferredDate).toISOString().split("T")[0]
              : "No Date",
            thanksNote:
              thankYouNotes[Math.floor(Math.random() * thankYouNotes.length)],
          }));
          setAppointments(normalized);
        }
      } catch (err) {
        console.error("Fetch Error:", err.message);
      }
    };

    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getSevenDays = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const dateString = `${y}-${m}-${day}`;
      return {
        dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: d.getDate(),
        dateString,
        isToday: i === 0,
        isBooked: appointments.some((a) => a.preferredDate === dateString),
      };
    });
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const upcoming = appointments.filter((a) => a.preferredDate >= todayStr);
  const finished = appointments.filter((a) => a.preferredDate < todayStr);
  const weekDays = getSevenDays();

  const handleFeedbackSubmit = () => {
    alert(`✅ Thanks for your ${feedbackRating}⭐ feedback!`);
    setShowFeedback(false);
    setFeedback("");
    setFeedbackRating(5);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogged(false);
    navigate("/");
  };

  if (!user) {
    return (
      <div className="pf-loading">
        <div className="pf-loading-spinner"></div>
        <p>Loading your profile…</p>
      </div>
    );
  }

  // ── Sidebar nav config ────────────────────────────────────────────────────
  const navItems = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "pets", icon: "🐾", label: "My Pets" },
    { id: "appointments", icon: "📅", label: "Appointments" },
    { id: "health", icon: "💉", label: "Health Tracker" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  // ── Views ─────────────────────────────────────────────────────────────────
  const renderDashboard = () => (
    <div className="pf-view">
      {/* Stat summary cards */}
      <div className="pf-stats-row">
        <div className="pf-stat-card pf-stat--total">
          <div className="pf-stat-icon">📋</div>
          <div>
            <div className="pf-stat-value">{appointments.length}</div>
            <div className="pf-stat-label">Total Bookings</div>
          </div>
        </div>
        <div className="pf-stat-card pf-stat--upcoming">
          <div className="pf-stat-icon">⏰</div>
          <div>
            <div className="pf-stat-value">{upcoming.length}</div>
            <div className="pf-stat-label">Upcoming</div>
          </div>
        </div>
        <div className="pf-stat-card pf-stat--done">
          <div className="pf-stat-icon">✅</div>
          <div>
            <div className="pf-stat-value">{finished.length}</div>
            <div className="pf-stat-label">Completed</div>
          </div>
        </div>
        <div className="pf-stat-card pf-stat--pet">
          <div className="pf-stat-icon">🐶</div>
          <div>
            <div className="pf-stat-value">{user.pets_name || "—"}</div>
            <div className="pf-stat-label">My Pet</div>
          </div>
        </div>
      </div>

      {/* Weekly schedule */}
      <div className="pf-card">
        <h3 className="pf-card-title">📆 Weekly Schedule</h3>
        <div className="pf-week-grid">
          {weekDays.map((day, i) => (
            <div
              key={i}
              className={`pf-day-slot ${day.isToday ? "pf-day--today" : ""} ${day.isBooked ? "pf-day--booked" : ""}`}
            >
              <span className="pf-day-name">{day.dayName}</span>
              <span className="pf-day-num">{day.dayNum}</span>
              {day.isBooked && <span className="pf-booked-dot" />}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming appointments (max 3) */}
      <div className="pf-card">
        <div className="pf-card-header-row">
          <h3 className="pf-card-title">⏰ Upcoming Appointments</h3>
          {upcoming.length > 3 && (
            <button
              className="pf-view-all-btn"
              onClick={() => setActiveTab("appointments")}
            >
              View all →
            </button>
          )}
        </div>
        {upcoming.length === 0 ? (
          <div className="pf-empty-state">
            <span>📅</span>
            <p>No upcoming appointments. <span className="pf-link" onClick={() => navigate("/Popup")}>Book one now →</span></p>
          </div>
        ) : (
          <div className="pf-apt-list">
            {upcoming.slice(0, 3).map((a, i) => (
              <div key={i} className="pf-apt-row">
                <div className="pf-apt-dot" />
                <div className="pf-apt-info">
                  <strong>{a.petType} Appointment</strong>
                  <span>{a.preferredDate} {a.preferredTime && `· ${a.preferredTime}`}</span>
                </div>
                <span className="pf-apt-status pf-apt-status--upcoming">Upcoming</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="pf-card">
        <h3 className="pf-card-title">⚡ Quick Actions</h3>
        <div className="pf-quick-actions">
          <button id="qa-book" className="pf-qa-btn" onClick={() => navigate("/Popup")}>
            <span>📅</span> Book Appointment
          </button>
          <button id="qa-health" className="pf-qa-btn" onClick={() => navigate("/health")}>
            <span>💉</span> Health Tracker
          </button>
          <button id="qa-clinic" className="pf-qa-btn" onClick={() => navigate("/Location")}>
            <span>🏥</span> Find Clinic
          </button>
          <button id="qa-training" className="pf-qa-btn" onClick={() => navigate("/training")}>
            <span>🐕</span> Dog Training
          </button>
        </div>
      </div>
    </div>
  );

  const renderPets = () => (
    <div className="pf-view">
      <div className="pf-pet-hero">
        <div className="pf-pet-avatar">🐾</div>
        <div className="pf-pet-info">
          <h2>{user.pets_name || "Add your pet's name"}</h2>
          <p className="pf-pet-owner">Owner: <strong>{user.name}</strong></p>
          {!user.pets_name && (
            <p className="pf-pet-hint">
              💡 You can set your pet's name in <span className="pf-link" onClick={() => setActiveTab("settings")}>Settings</span>
            </p>
          )}
        </div>
      </div>

      <div className="pf-grid-2">
        {/* Health snapshot */}
        <div className="pf-card">
          <h3 className="pf-card-title">💉 Health Snapshot</h3>
          <p className="pf-card-desc">Keep all vaccination records, medicines, and health logs in one place.</p>
          <button id="btn-go-health" className="pf-primary-btn" onClick={() => navigate("/health")}>
            Open Health Tracker →
          </button>
        </div>

        {/* Training */}
        <div className="pf-card">
          <h3 className="pf-card-title">🐕 Training Programs</h3>
          <p className="pf-card-desc">Explore curated training guides from puppy basics to advanced agility.</p>
          <button id="btn-go-training" className="pf-primary-btn" onClick={() => navigate("/training")}>
            View Training →
          </button>
        </div>

        {/* Grooming */}
        <div className="pf-card">
          <h3 className="pf-card-title">✂️ Grooming Guide</h3>
          <p className="pf-card-desc">Professional grooming tips to keep your pet looking and feeling great.</p>
          <button id="btn-go-groom" className="pf-primary-btn" onClick={() => navigate("/dogGroom")}>
            View Grooming →
          </button>
        </div>

        {/* Find Clinic */}
        <div className="pf-card">
          <h3 className="pf-card-title">🏥 Nearby Clinics</h3>
          <p className="pf-card-desc">Find trusted vets and animal hospitals near your location.</p>
          <button id="btn-go-clinic" className="pf-primary-btn" onClick={() => navigate("/Location")}>
            Find Clinics →
          </button>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="pf-view">
      {/* Upcoming */}
      <div className="pf-card">
        <h3 className="pf-card-title">⏰ Upcoming Appointments</h3>
        {upcoming.length === 0 ? (
          <div className="pf-empty-state">
            <span>📅</span>
            <p>No upcoming appointments yet.</p>
            <button className="pf-primary-btn" onClick={() => navigate("/Popup")}>Book Now</button>
          </div>
        ) : (
          <div className="pf-upcoming-grid">
            {upcoming.map((a, i) => (
              <div key={i} className="pf-upcoming-card">
                <div className="pf-uc-header">
                  <span className="pf-time-badge">{a.preferredTime || "TBD"}</span>
                  <span className="pf-status-chip pf-status-chip--upcoming">Upcoming</span>
                </div>
                <h4 className="pf-uc-title">{a.petType} Appointment</h4>
                <p className="pf-uc-date">📅 {a.preferredDate}</p>
                {a.ownerName && <p className="pf-uc-owner">👤 {a.ownerName}</p>}
                <p className="pf-uc-preparing">Preparing for your visit…</p>
                <button
                  className="pf-reminder-btn"
                  onClick={() => alert("🔔 Reminder set!")}
                >
                  Set Reminder
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Finished history */}
      <div className="pf-card">
        <h3 className="pf-card-title">✅ Finished History</h3>
        {finished.length === 0 ? (
          <div className="pf-empty-state">
            <span>📋</span>
            <p>No past appointments yet.</p>
          </div>
        ) : (
          <div className="pf-finished-grid">
            {finished.map((a, i) => (
              <div key={i} className="pf-finished-card">
                <div className="pf-fc-header">
                  <span className="pf-status-chip pf-status-chip--done">Done</span>
                </div>
                <h4 className="pf-fc-title">{a.petType} Appointment</h4>
                <p className="pf-fc-date">📅 {a.preferredDate}</p>
                <div className="pf-thanks-note">{a.thanksNote}</div>
                <button
                  id={`feedback-btn-${i}`}
                  className="pf-feedback-btn"
                  onClick={() => {
                    setSelectedApt(a);
                    setShowFeedback(true);
                  }}
                >
                  ⭐ Leave Feedback
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderHealth = () => (
    <div className="pf-view">
      <div className="pf-health-banner">
        <div className="pf-health-banner-text">
          <span className="pf-health-eyebrow">🐾 Medical Records</span>
          <h2>Health & Vaccination Tracker</h2>
          <p>Track vaccinations, medicines, and health logs for {user.pets_name || "your pet"} with smart reminders.</p>
          <button id="btn-open-tracker" className="pf-primary-btn" onClick={() => navigate("/health")}>
            Open Full Tracker →
          </button>
        </div>
        <div className="pf-health-banner-icon">💉</div>
      </div>

      <div className="pf-grid-2">
        <div className="pf-card pf-card--tip">
          <div className="pf-tip-icon">📌</div>
          <h4>Stay on Schedule</h4>
          <p>Keep track of upcoming vaccine due dates so you never miss a booster.</p>
        </div>
        <div className="pf-card pf-card--tip">
          <div className="pf-tip-icon">💊</div>
          <h4>Medicine Log</h4>
          <p>Record your pet's medicines and dosages all in one organized dashboard.</p>
        </div>
        <div className="pf-card pf-card--tip">
          <div className="pf-tip-icon">📋</div>
          <h4>Health Notes</h4>
          <p>Write detailed notes from vet visits, symptoms, and check-up results.</p>
        </div>
        <div className="pf-card pf-card--tip">
          <div className="pf-tip-icon">🔔</div>
          <h4>Smart Alerts</h4>
          <p>Get alerted when a vaccine or medicine is due within the next 30 days.</p>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="pf-view">
      <div className="pf-card pf-settings-card">
        <div className="pf-settings-avatar">
          {user.name ? user.name[0].toUpperCase() : "?"}
        </div>
        <h2 className="pf-settings-name">{user.name}</h2>
        <p className="pf-settings-role">Pet Owner · PetCare Member</p>

        <div className="pf-settings-fields">
          <div className="pf-settings-row">
            <span className="pf-settings-icon">📧</span>
            <div>
              <div className="pf-settings-field-label">Email</div>
              <div className="pf-settings-field-value">{user.email}</div>
            </div>
          </div>
          <div className="pf-settings-row">
            <span className="pf-settings-icon">📞</span>
            <div>
              <div className="pf-settings-field-label">Phone</div>
              <div className="pf-settings-field-value">{user.phone_number || "Not set"}</div>
            </div>
          </div>
          <div className="pf-settings-row">
            <span className="pf-settings-icon">🐾</span>
            <div>
              <div className="pf-settings-field-label">Pet's Name</div>
              <div className="pf-settings-field-value">{user.pets_name || "Not set"}</div>
            </div>
          </div>
          <div className="pf-settings-row">
            <span className="pf-settings-icon">📍</span>
            <div>
              <div className="pf-settings-field-label">Location</div>
              <div className="pf-settings-field-value">{user.location || "Not set"}</div>
            </div>
          </div>
        </div>

        <button id="btn-logout-settings" className="pf-logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );

  const views = {
    dashboard: renderDashboard,
    pets: renderPets,
    appointments: renderAppointments,
    health: renderHealth,
    settings: renderSettings,
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="pf-layout">
      {/* ── Sidebar ── */}
      <aside className="pf-sidebar">
        <div className="pf-sidebar-logo">🐾 PetCare</div>

        <nav className="pf-sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`pf-nav-item ${activeTab === item.id ? "pf-nav-item--active" : ""}`}
              onClick={() =>
                item.id === "health"
                  ? navigate("/health")
                  : setActiveTab(item.id)
              }
            >
              <span className="pf-nav-icon">{item.icon}</span>
              <span className="pf-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pf-sidebar-footer">
          <div className="pf-sidebar-user">
            <div className="pf-sidebar-user-avatar">
              {user.name[0].toUpperCase()}
            </div>
            <div className="pf-sidebar-user-info">
              <span className="pf-sidebar-user-name">{user.name}</span>
              <span className="pf-sidebar-user-role">Pet Owner</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="pf-main">
        {/* Top bar */}
        <header className="pf-topbar">
          <div className="pf-topbar-left">
            <h2 className="pf-topbar-title">
              {navItems.find((n) => n.id === activeTab)?.label || "Dashboard"}
            </h2>
            <span className="pf-topbar-greeting">
              Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, {user.name.split(" ")[0]}! 👋
            </span>
          </div>
          <div className="pf-topbar-right">
            <span className="pf-topbar-user">{user.name}</span>
            <div className="pf-topbar-avatar">{user.name[0].toUpperCase()}</div>
            <button id="btn-logout-top" className="pf-logout-pill" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="pf-content">
          {(views[activeTab] || renderDashboard)()}
        </main>
      </div>

      {/* ── Feedback Modal ── */}
      {showFeedback && selectedApt && (
        <div
          className="pf-modal-overlay"
          onClick={() => setShowFeedback(false)}
        >
          <div
            className="pf-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="pf-modal-close"
              onClick={() => setShowFeedback(false)}
            >
              ✕
            </button>
            <h3>⭐ Leave Feedback</h3>
            <p className="pf-modal-sub">
              How was your <strong>{selectedApt.petType}</strong> appointment on{" "}
              <strong>{selectedApt.preferredDate}</strong>?
            </p>

            {/* Star rating */}
            <div className="pf-star-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  id={`star-${star}`}
                  className={`pf-star ${star <= feedbackRating ? "pf-star--active" : ""}`}
                  onClick={() => setFeedbackRating(star)}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              className="pf-modal-textarea"
              rows={4}
              placeholder="Share your experience…"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="pf-modal-actions">
              <button
                className="pf-modal-cancel"
                onClick={() => setShowFeedback(false)}
              >
                Cancel
              </button>
              <button
                id="btn-submit-feedback"
                className="pf-modal-submit"
                onClick={handleFeedbackSubmit}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;