import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthBranding from './auth-branding/AuthBranding';
import Logo from '../../assets/Logo';
import { toast } from '../../utils/toast';
import './auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    try {
      if (!email || !password) {
        setFormError("Please fill in all fields.");
        return;
      }

      const res = await login(email, password);
      if (res.success) {
        toast.success("Welcome back! Login successful.");
        navigate('/dashboard');
      } else {
        const errorMsg = res.error || 'Login failed';
        setFormError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setFormError("An unexpected error occurred.");
      toast.error("Something went wrong. Please check your connection.");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-center-panel">
        <div className="auth-header-logo">
          <Logo size="140px" showText={true} />
        </div>

        <div className="auth-form-wrapper">
          <h1 className="auth-title">Log into your workspace</h1>
          <p className="auth-subtitle">We suggest using the <strong>email address you use at work.</strong></p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="auth-input-group" style={{ marginBottom: '16px' }}>
              <input
                type="email"
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-input-group" style={{ marginBottom: '24px' }}>
              <div
                className="password-input-wrapper"
                style={{ position: "relative" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </div>
              </div>
            </div>

            {(formError || authError) && (
              <div className="auth-status-message auth-status-error">
                {formError || authError}
              </div>
            )}

            <button type="submit" className="auth-button">
              Continue
            </button>

            <div
              className="signup-prompt"
              style={{
                textAlign: "center",
                marginTop: "24px",
                fontSize: "14px",
                color: "var(--color-text)",
              }}
            >
              New to Nimbus?{" "}
              <Link
                to="/signup"
                style={{
                  color: "var(--color-accent)",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                Create an account
              </Link>
            </div>
            <div style={{ textAlign: "center", marginTop: "12px", fontSize: "14px" }}>
              <Link
                to="/forgot-password"
                style={{
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                }}
              >
                Forgot your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;