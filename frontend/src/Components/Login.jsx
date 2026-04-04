import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthForms.css";

const Login = ({ setLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
        setError(data.message || "Invalid email or password.");
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
      <div className="auth-card">

        {/* ── Left: form ── */}
        <div className="auth-left">
          {/* Branding */}
          <div className="auth-brand">
            <span className="auth-brand-logo">🐾</span>
            <span className="auth-brand-name">PetCare</span>
          </div>

          <h1 className="auth-heading">Welcome back!</h1>
          <p className="auth-subheading">Sign in to continue caring for your pet.</p>

          {/* Error banner */}
          {error && (
            <div className="auth-error" role="alert">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {/* Email */}
            <div className="auth-field">
              <label htmlFor="login-email">Email address</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉️</span>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="login-password">Password</label>
                <span className="auth-forgot">Forgot password?</span>
              </div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon"></span>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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
            </div>

            {/* Submit */}
            <button
              id="btn-login-submit"
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="auth-btn-inner">
                  <span className="auth-spinner" />
                  Signing in…
                </span>
              ) : (
                <span className="auth-btn-inner">
                  Login to PetCare
                  <span className="auth-btn-arrow">→</span>
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider"><span>OR</span></div>

          {/* Social buttons */}
          <div className="auth-social-row">
            <button type="button" className="auth-social-btn" id="btn-google-login">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
                <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05" />
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Switch link */}
          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-switch-link">Create one →</Link>
          </p>
        </div>

        {/* ── Right: decorative panel ── */}
        <div className="auth-right">
          <div className="auth-right-content">
            <div className="auth-right-emoji">🐾</div>
            <h2 className="auth-right-title">Your pet deserves the best care.</h2>
            <p className="auth-right-desc">
              Track vaccinations, book appointments, find clinics, and more — all in one place.
            </p>
            <div className="auth-right-features">
              <div className="auth-right-feat">💉 Vaccination tracking</div>
              <div className="auth-right-feat">📅 Easy appointment booking</div>
              <div className="auth-right-feat">🏥 Nearby clinics finder</div>
              <div className="auth-right-feat">🤖 AI pet assistant</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;