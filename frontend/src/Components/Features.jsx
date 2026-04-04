/**
 * Features.jsx
 * Location: frontend/src/Components/Features.jsx
 *
 * Showcases all PetCare features in a premium card grid layout.
 * The "Health & Vaccination Tracker" card is highlighted as a key feature
 * with a "New" badge and a live preview snippet.
 */

import { useNavigate } from "react-router-dom";
import "./Features.css";

// ─── Feature data ────────────────────────────────────────────────────────────
const features = [
  {
    id: "health-tracker",
    icon: "💉",
    title: "Health & Vaccination Tracker",
    description:
      "Track your pet's vaccinations, medicines, and health logs with smart due-date reminders.",
    badge: "New",
    highlight: true,
    preview: "🔔 Rabies booster due in 3 days!",
    route: "/health",
    btnLabel: "View Tracker",
  },
  {
    id: "dog-training",
    icon: "🐕",
    title: "Dog Training Programs",
    description:
      "Step-by-step training plans for basic commands, behavior correction, advanced tricks, and puppies.",
    badge: null,
    highlight: false,
    preview: null,
    route: "/training",
    btnLabel: "Start Training",
  },
  {
    id: "dog-grooming",
    icon: "✂️",
    title: "Dog Grooming Guide",
    description:
      "Professional grooming tips and routines to keep your dog looking and feeling their best.",
    badge: null,
    highlight: false,
    preview: null,
    route: "/dogGroom",
    btnLabel: "Learn More",
  },
  {
    id: "find-clinic",
    icon: "🏥",
    title: "Find Nearby Clinics",
    description:
      "Locate trusted veterinary clinics and animal hospitals near you with ratings and directions.",
    badge: null,
    highlight: false,
    preview: null,
    route: "/Location",
    btnLabel: "Find Clinics",
  },
  {
    id: "book-appointment",
    icon: "📅",
    title: "Book Appointments",
    description:
      "Seamlessly schedule vet visits, grooming sessions, and check-ups — all in one place.",
    badge: null,
    highlight: false,
    preview: null,
    route: "/Popup",
    btnLabel: "Book Now",
  },
  {
    id: "ai-chatbot",
    icon: "🤖",
    title: "AI Pet Assistant",
    description:
      "Get instant answers to pet care questions from our Groq-powered AI chatbot available 24/7.",
    badge: null,
    highlight: false,
    preview: null,
    route: null, // chatbot is a floating widget — no separate page
    btnLabel: null,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Features() {
  const navigate = useNavigate();

  return (
    <div className="features-page">
      {/* ── Hero header ── */}
      <div className="features-hero">
        <span className="features-eyebrow">Everything your pet needs</span>
        <h1 className="features-title">Our Features</h1>
        <p className="features-subtitle">
          A complete toolkit to keep your furry friend happy, healthy, and well
          cared for.
        </p>
      </div>

      {/* ── Card grid ── */}
      <div className="features-grid">
        {features.map((feat) => (
          <div
            key={feat.id}
            id={`feature-card-${feat.id}`}
            className={`feat-card ${feat.highlight ? "feat-card--highlight" : ""}`}
          >
            {/* Badge */}
            {feat.badge && (
              <span className="feat-badge">{feat.badge}</span>
            )}

            {/* Icon */}
            <div className="feat-icon">{feat.icon}</div>

            {/* Text */}
            <h2 className="feat-card-title">{feat.title}</h2>
            <p className="feat-card-desc">{feat.description}</p>

            {/* Preview snippet (only on highlight card) */}
            {feat.preview && (
              <div className="feat-preview">
                <span>{feat.preview}</span>
              </div>
            )}

            {/* CTA button */}
            {feat.route && feat.btnLabel && (
              <button
                id={`btn-${feat.id}`}
                className={`feat-btn ${feat.highlight ? "feat-btn--primary" : "feat-btn--secondary"}`}
                onClick={() => navigate(feat.route)}
              >
                {feat.btnLabel}
              </button>
            )}

            {/* No route? show a "floating widget" note */}
            {!feat.route && feat.btnLabel === null && (
              <p className="feat-chatbot-note">
                💬 Available as the floating chat button below
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}