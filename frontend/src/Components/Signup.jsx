import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthForms.css";

const Signup = ({ setLogged }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    pets_name: "",
    phone_number: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handle = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          location: form.location,
          pets_name: form.pets_name,
          phone_number: form.phone_number,
        }),
      });

      let data;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = text ? { message: text } : {};
      }

      if (!res.ok) {
        setError(data.message || "Signup failed. Please try again.");
      } else {
        localStorage.setItem("token", data.token);
        setLogged(true);
        navigate("/");
      }
    } catch (err) {
      setError("Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--signup">

        {/* ── Left: decorative panel ── */}
        <div className="auth-right auth-right--signup">
          <div className="auth-right-content">
            <div className="auth-right-emoji">🐶</div>
            <h2 className="auth-right-title">Join the PetCare family!</h2>
            <p className="auth-right-desc">
              Create your free account and start giving your pet the care they deserve.
            </p>
            <div className="auth-right-features">
              <div className="auth-right-feat">🆓 Free to get started</div>
              <div className="auth-right-feat">💉 Health & vaccine tracking</div>
              <div className="auth-right-feat">📅 Appointment management</div>
              <div className="auth-right-feat">🤖 24/7 AI assistant</div>
            </div>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="auth-left">
          {/* Branding */}
          <div className="auth-brand">
            <span className="auth-brand-logo">🐾</span>
            <span className="auth-brand-name">PetCare</span>
          </div>

          <h1 className="auth-heading">Create your account</h1>
          <p className="auth-subheading">It takes less than a minute to get started.</p>

          {/* Error banner */}
          {error && (
            <div className="auth-error" role="alert">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>

            {/* Name + Phone — 2 cols */}
            <div className="auth-row">
              <div className="auth-field">
                <label htmlFor="su-name">Full Name *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"></span>
                  <input
                    id="su-name"
                    type="text"
                    value={form.name}
                    onChange={handle("name")}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="su-phone">Phone <span className="auth-optional">(optional)</span></label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"></span>
                  <input
                    id="su-phone"
                    type="tel"
                    value={form.phone_number}
                    onChange={handle("phone_number")}
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="auth-field">
              <label htmlFor="su-email">Email address *</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"></span>
                <input
                  id="su-email"
                  type="email"
                  value={form.email}
                  onChange={handle("email")}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="su-password">Password *</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"></span>
                <input
                  id="su-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={handle("password")}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {/* Password strength bar */}
              {form.password.length > 0 && (
                <div className="auth-strength-bar">
                  <div
                    className={`auth-strength-fill ${form.password.length < 6
                      ? "auth-strength--weak"
                      : form.password.length < 10
                        ? "auth-strength--medium"
                        : "auth-strength--strong"
                      }`}
                    style={{
                      width:
                        form.password.length < 6
                          ? "33%"
                          : form.password.length < 10
                            ? "66%"
                            : "100%",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Pet name + Location */}
            <div className="auth-row">
              <div className="auth-field">
                <label htmlFor="su-pet">Pet's Name <span className="auth-optional">(optional)</span></label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">🐾</span>
                  <input
                    id="su-pet"
                    type="text"

                    value={form.pets_name}
                    onChange={handle("pets_name")}
                  />
                </div>
              </div>

              <div className="auth-field">
                <label htmlFor="su-location">Location *</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"></span>
                  <input
                    id="su-location"
                    type="text"
                    value={form.location}
                    onChange={handle("location")}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              id="btn-signup-submit"
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="auth-btn-inner">
                  <span className="auth-spinner" />
                  Creating account…
                </span>
              ) : (
                <span className="auth-btn-inner">
                  Create My Account
                  <span className="auth-btn-arrow">→</span>
                </span>
              )}
            </button>
          </form>

          {/* Switch link */}
          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-switch-link">Sign in →</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;
