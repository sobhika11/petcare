import { useEffect, useState } from "react";
import axios from "axios";
import "./HealthTracker.css";
const API = "http://localhost:5000/api/health";
function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const recordTypeConfig = {
  vaccine: { icon: "💉", label: "Vaccine", color: "#d97706" },
  medicine: { icon: "💊", label: "Medicine", color: "#059669" },
  log: { icon: "📋", label: "Health Log", color: "#7c3aed" },
};

const emptyForm = {
  petName: "",
  recordType: "vaccine",
  vaccineName: "",
  vaccineDate: "",
  nextDueDate: "",
  medicineName: "",
  medicineDosage: "",
  healthNote: "",
};

export default function HealthTracker() {
  // Use the logged-in user's petId from localStorage, or fall back to "demo"
  const petId = localStorage.getItem("petId") || "demo";

  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  async function fetchRecords() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API}/${petId}`);
      setRecords(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not load records. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecords();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.petName.trim()) {
      setError("Please enter your pet's name.");
      return;
    }
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(API, { ...form, petId });
      setSuccess("✅ Record added successfully!");
      setForm(emptyForm);
      setShowForm(false);
      fetchRecords();
    } catch (err) {
      console.error(err);
      setError("Failed to save record. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this record?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      setRecords((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError("Failed to delete record.");
    }
  }
  const upcomingAlerts = records.filter((r) => {
    const days = daysUntil(r.nextDueDate);
    return days !== null && days >= 0 && days <= 30;
  });

  return (
    <div className="ht-page">
      {/* ── Page header ── */}
      <div className="ht-header">
        <div>
          <span className="ht-eyebrow">🐾 Health Dashboard</span>
          <h1 className="ht-title">Health & Vaccination Tracker</h1>
          <p className="ht-subtitle">
            Keep all your pet's medical history, vaccines, and medicines in one
            place.
          </p>
        </div>
        <button
          id="btn-add-record"
          className="ht-add-btn"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? "✕ Cancel" : "+ Add Record"}
        </button>
      </div>

      {/* ── Alerts banner ── */}
      {upcomingAlerts.length > 0 && (
        <div className="ht-alerts">
          <strong>🔔 Upcoming Due Dates</strong>
          <div className="ht-alerts-list">
            {upcomingAlerts.map((r) => {
              const days = daysUntil(r.nextDueDate);
              return (
                <span key={r._id} className="ht-alert-pill">
                  {r.vaccineName || r.medicineName || "Record"} —{" "}
                  {days === 0 ? "due today!" : `in ${days} day${days > 1 ? "s" : ""}`}
                </span>
              );
            })}
          </div>
        </div>
      )}
      {success && <div className="ht-msg ht-msg--success">{success}</div>}
      {error && <div className="ht-msg ht-msg--error">{error}</div>}

      {/* ── Add Record Form ── */}
      {showForm && (
        <form className="ht-form" onSubmit={handleSubmit} id="health-record-form">
          <h2 className="ht-form-title">📝 New Health Record</h2>

          {/* Pet name */}
          <div className="ht-field">
            <label htmlFor="petName">Pet Name *</label>
            <input
              id="petName"
              type="text"
              placeholder="e.g. Bruno"
              value={form.petName}
              onChange={(e) => setForm({ ...form, petName: e.target.value })}
              required
            />
          </div>
          <div className="ht-field">
            <label>Record Type</label>
            <div className="ht-type-selector">
              {Object.entries(recordTypeConfig).map(([type, cfg]) => (
                <button
                  key={type}
                  type="button"
                  id={`type-btn-${type}`}
                  className={`ht-type-btn ${form.recordType === type ? "ht-type-btn--active" : ""}`}
                  style={form.recordType === type ? { borderColor: cfg.color, color: cfg.color } : {}}
                  onClick={() => setForm({ ...form, recordType: type })}
                >
                  {cfg.icon} {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vaccine fields */}
          {form.recordType === "vaccine" && (
            <>
              <div className="ht-field">
                <label htmlFor="vaccineName">Vaccine Name</label>
                <input
                  id="vaccineName"
                  type="text"
                  placeholder="e.g. Rabies"
                  value={form.vaccineName}
                  onChange={(e) => setForm({ ...form, vaccineName: e.target.value })}
                />
              </div>
              <div className="ht-row">
                <div className="ht-field">
                  <label htmlFor="vaccineDate">Date Administered</label>
                  <input
                    id="vaccineDate"
                    type="date"
                    value={form.vaccineDate}
                    onChange={(e) => setForm({ ...form, vaccineDate: e.target.value })}
                  />
                </div>
                <div className="ht-field">
                  <label htmlFor="nextDueDate">Next Due Date</label>
                  <input
                    id="nextDueDate"
                    type="date"
                    value={form.nextDueDate}
                    onChange={(e) => setForm({ ...form, nextDueDate: e.target.value })}
                  />
                </div>
              </div>
            </>
          )}

          {/* Medicine fields */}
          {form.recordType === "medicine" && (
            <div className="ht-row">
              <div className="ht-field">
                <label htmlFor="medicineName">Medicine Name</label>
                <input
                  id="medicineName"
                  type="text"
                  placeholder="e.g. Heartgard"
                  value={form.medicineName}
                  onChange={(e) => setForm({ ...form, medicineName: e.target.value })}
                />
              </div>
              <div className="ht-field">
                <label htmlFor="medicineDosage">Dosage</label>
                <input
                  id="medicineDosage"
                  type="text"
                  placeholder="e.g. 1 tablet / day"
                  value={form.medicineDosage}
                  onChange={(e) => setForm({ ...form, medicineDosage: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Health log field */}
          {form.recordType === "log" && (
            <div className="ht-field">
              <label htmlFor="healthNote">Health Note</label>
              <textarea
                id="healthNote"
                rows={4}
                placeholder="Describe symptoms, vet visit notes, etc."
                value={form.healthNote}
                onChange={(e) => setForm({ ...form, healthNote: e.target.value })}
              />
            </div>
          )}

          <button
            id="submit-record-btn"
            type="submit"
            className="ht-submit-btn"
            disabled={submitting}
          >
            {submitting ? "Saving…" : "💾 Save Record"}
          </button>
        </form>
      )}

      {/* ── Records list ── */}
      <div className="ht-records-section">
        <h2 className="ht-section-heading">
          📒 Health Records{" "}
          <span className="ht-count">{records.length}</span>
        </h2>

        {loading ? (
          <div className="ht-loading">Loading records…</div>
        ) : records.length === 0 ? (
          <div className="ht-empty">
            <span>🐾</span>
            <p>No records yet. Click <strong>"+ Add Record"</strong> to get started!</p>
          </div>
        ) : (
          <div className="ht-cards-grid">
            {records.map((rec) => {
              const cfg = recordTypeConfig[rec.recordType] || recordTypeConfig.log;
              const days = daysUntil(rec.nextDueDate);
              const isUrgent = days !== null && days >= 0 && days <= 7;

              return (
                <div
                  key={rec._id}
                  className={`ht-rec-card ${isUrgent ? "ht-rec-card--urgent" : ""}`}
                >
                  {/* Card header */}
                  <div className="ht-rec-header">
                    <span
                      className="ht-rec-type-badge"
                      style={{ background: cfg.color + "22", color: cfg.color }}
                    >
                      {cfg.icon} {cfg.label}
                    </span>
                    <button
                      id={`delete-${rec._id}`}
                      className="ht-delete-btn"
                      onClick={() => handleDelete(rec._id)}
                      title="Delete record"
                    >
                      🗑
                    </button>
                  </div>

                  {/* Pet name */}
                  <h3 className="ht-rec-pet">{rec.petName}</h3>

                  {/* Fields by type */}
                  {rec.recordType === "vaccine" && (
                    <>
                      {rec.vaccineName && (
                        <p><strong>Vaccine:</strong> {rec.vaccineName}</p>
                      )}
                      {rec.vaccineDate && (
                        <p><strong>Given on:</strong> {formatDate(rec.vaccineDate)}</p>
                      )}
                      {rec.nextDueDate && (
                        <p className={isUrgent ? "ht-due-urgent" : ""}>
                          <strong>Next due:</strong> {formatDate(rec.nextDueDate)}
                          {days !== null && days >= 0 && (
                            <span className="ht-days-pill">
                              {days === 0 ? "Today!" : `${days}d left`}
                            </span>
                          )}
                        </p>
                      )}
                    </>
                  )}

                  {rec.recordType === "medicine" && (
                    <>
                      {rec.medicineName && (
                        <p><strong>Medicine:</strong> {rec.medicineName}</p>
                      )}
                      {rec.medicineDosage && (
                        <p><strong>Dosage:</strong> {rec.medicineDosage}</p>
                      )}
                    </>
                  )}

                  {rec.recordType === "log" && (
                    <p className="ht-rec-note">{rec.healthNote}</p>
                  )}

                  {/* Timestamp */}
                  <p className="ht-rec-ts">Added: {formatDate(rec.createdAt)}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}