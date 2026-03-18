import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/Logo';
import { toast } from '../../utils/toast';
import './auth.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Society Member');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { signup, error: authError } = useAuth();
    const navigate = useNavigate();
    const [formError, setFormError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        if (!name || !email || !password || !confirmPassword) {
            setFormError("Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            setFormError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setFormError("Password must be at least 6 characters.");
            return;
        }

        const res = await signup(name, email, password, confirmPassword, role);

        if (res.success) {
            toast.success("Account created! Please verify your email.");
            navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
        } else {
            const errorMsg = res.error || 'Signup failed';
            setFormError(errorMsg);
            toast.error(errorMsg);
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-center-panel">
                <div className="auth-header-logo">
                    <Logo size="140px" showText={true} />
                </div>

                <div className="auth-form-wrapper">
                    <h1 className="auth-title">Create an account</h1>
                    <p className="auth-subtitle">We suggest using the <strong>email address you use at work.</strong></p>

                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="auth-input-group">
                            <input
                                type="text"
                                className="auth-input"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="auth-input-group">
                            <input
                                type="email"
                                className="auth-input"
                                placeholder="name@work-email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="auth-input-group">
                            <select className="auth-input" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="Society Member">Society Member</option>
                                <option value="Professor">Professor</option>
                                <option value="Office Staff">Office Staff</option>
                            </select>
                        </div>

                        <div className="auth-input-group">
                            <div className="password-input-wrapper" style={{ position: 'relative' }}>
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
                                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </div>
                            </div>
                        </div>

                        <div className="auth-input-group">
                            <div className="password-input-wrapper" style={{ position: 'relative' }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="auth-input"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                >
                                    {showConfirmPassword ? "🙈" : "👁️"}
                                </div>
                            </div>
                        </div>

                        {(formError || authError) && (
                            <div className="auth-status-message auth-status-error">
                                {formError || authError}
                            </div>
                        )}

                        <button type="submit" className="auth-button">Continue</button>

                        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--color-text)' }}>
                            Already using Nimbus? <Link to="/login" style={{ color: 'var(--color-accent)', fontWeight: '700', textDecoration: 'none' }}>Sign in to an existing workspace</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;