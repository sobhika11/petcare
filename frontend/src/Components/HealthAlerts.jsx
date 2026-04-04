import "./HealthAlerts.css";
const alerts = [
  {
    id: 1,
    level: "High",
    title: "Canine Parvovirus Alert",
    location: "Salem Region",
    symptoms: ["Severe vomiting & diarrhoea", "Lethargy", "Bloody stool", "Rapid dehydration"],
    tip: "Vaccinate puppies at 6–8 weeks. Avoid contact with unvaccinated dogs.",
  },
  {
    id: 2,
    level: "High",
    title: "Canine Distemper Outbreak",
    location: "Coimbatore District",
    symptoms: ["Runny nose & watery eyes", "Coughing and sneezing", "Fever above 39.5°C", "Seizures in severe cases"],
    tip: "Keep your dog's DHPPiL vaccination up to date.",
  },
  {
    id: 3,
    level: "Medium",
    title: "Tick-Borne Fever (Ehrlichiosis)",
    location: "Chennai & Surrounding Areas",
    symptoms: ["High fever and chills", "Loss of appetite", "Swollen lymph nodes"],
    tip: "Use vet-recommended tick prevention products every month.",
  },
  {
    id: 4,
    level: "Medium",
    title: "Feline Upper Respiratory Infection",
    location: "Bangalore Urban",
    symptoms: ["Sneezing & nasal discharge", "Red, watery eyes", "Reduced appetite"],
    tip: "Keep cats indoors and vaccinate against FHV and FCV.",
  },
  {
    id: 5,
    level: "Low",
    title: "Kennel Cough Reported",
    location: "Hyderabad Pet Zones",
    symptoms: ["Persistent dry, honking cough", "Retching after coughing", "Mild fever"],
    tip: "Bordetella vaccine significantly reduces risk.",
  },
  {
    id: 6,
    level: "High",
    title: "Leptospirosis Warning",
    location: "Mumbai Flood-Prone Areas",
    symptoms: ["High fever and shivering", "Muscle pain & weakness", "Jaundice (yellow eyes/skin)"],
    tip: "Avoid letting pets wade in stagnant water, especially after rain.",
  },
];

// ── Severity config ───────────────────────────────────────────────────────────
const severityConfig = {
  High:   { textColor: "#b91c1c", bgColor: "#fee2e2", borderColor: "#fca5a5", dot: "●" },
  Medium: { textColor: "#b45309", bgColor: "#fef3c7", borderColor: "#fcd34d", dot: "●" },
  Low:    { textColor: "#15803d", bgColor: "#dcfce7", borderColor: "#86efac", dot: "●" },
};
export default function HealthAlerts() {
  return (
    <section className="ha-section">

      {/* Header */}
      <div className="ha-header">
        <div className="ha-header-text">
          <h2 className="ha-title">📋 Pet Health Alerts</h2>
          <p className="ha-subtitle">
            Stay informed about active disease outbreaks near you.
          </p>
        </div>

        {/* Legend */}
        <div className="ha-legend">
          <span className="ha-chip ha-chip--high">● High</span>
          <span className="ha-chip ha-chip--medium">● Medium</span>
          <span className="ha-chip ha-chip--low">● Low</span>
        </div>
      </div>

      {/* Card grid */}
      <div className="ha-grid">
        {alerts.map((alert) => {
          const sev = severityConfig[alert.level];
          return (
            <div key={alert.id} className="ha-card">

              {/* Top border accent */}
              <div
                className="ha-card-accent"
                style={{ backgroundColor: sev.textColor }}
              />

              {/* Card body */}
              <div className="ha-card-body">

                {/* Severity badge */}
                <span
                  className="ha-badge"
                  style={{
                    color: sev.textColor,
                    backgroundColor: sev.bgColor,
                    borderColor: sev.borderColor,
                  }}
                >
                  {sev.dot} {alert.level} Severity
                </span>

                {/* Title */}
                <h3 className="ha-card-title">{alert.title}</h3>

                {/* Location */}
                <p className="ha-location">📍 {alert.location}</p>

                {/* Divider */}
                <hr className="ha-divider" />

                {/* Symptoms */}
                <div className="ha-symptoms-box">
                  <p className="ha-symptoms-label">Symptoms</p>
                  <ul className="ha-symptoms">
                    {alert.symptoms.map((s, i) => (
                      <li key={i} style={{ "--dot-color": sev.textColor }}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tip */}
                <div
                  className="ha-tip"
                  style={{ borderLeftColor: sev.textColor, backgroundColor: sev.bgColor }}
                >
                  <span className="ha-tip-icon">💡</span>
                  <p>{alert.tip}</p>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="ha-disclaimer">
        🐾 For accurate medical advice, always consult your veterinarian.
      </p>
    </section>
  );
}
