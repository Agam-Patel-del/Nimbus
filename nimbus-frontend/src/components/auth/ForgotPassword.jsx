import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/Logo';
import { toast } from '../../utils/toast';
import './auth.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const otpVerified = searchParams.get('otpVerified') === 'true';
    const emailParam = searchParams.get('email') || '';
    const returnedOtp = searchParams.get('otp') || '';

    const [stage, setStage] = useState('email'); // 'email', 'resetPassword'
    const [email, setEmail] = useState(emailParam);
    const [otp, setOtp] = useState(returnedOtp ? returnedOtp.split('') : ['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const { sendForgotPasswordOtp, resetPassword } = useAuth();

    useEffect(() => {
        if (otpVerified && emailParam) {
            setStage('resetPassword');
            setEmail(emailParam);
            if (returnedOtp) setOtp(returnedOtp.split(''));
        }
    }, [otpVerified, emailParam, returnedOtp]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        if (!email) { setError('Email is required'); return; }
        setLoading(true);
        const result = await sendForgotPasswordOtp(email);
        setLoading(false);
        if (result.success) {
            toast.success("OTP sent to your email!");
            navigate(`/verify-otp?email=${encodeURIComponent(email)}&source=forgotPassword`);
        } else {
            const errorMsg = result.error || 'Failed to send OTP';
            setError(errorMsg);
            toast.error(errorMsg);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        if (!newPassword || !confirmPassword) { setError('All fields are required'); return; }
        if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
        if (newPassword.length < 6) { setError('Password must be at least 6 characters'); return; }
        setLoading(true);
        const otpString = otp.join('');
        const result = await resetPassword(email, otpString, newPassword, confirmPassword);
        setLoading(false);
        if (result.success) {
            const successMsg = 'Password reset successful!';
            setSuccessMessage(`✓ ${successMsg}`);
            toast.success(successMsg);
            setTimeout(() => navigate('/login'), 2000);
        } else {
            const errorMsg = result.error || 'Failed to reset password';
            setError(errorMsg);
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
                    {successMessage && (
                        <div className="auth-status-message auth-status-success">
                            {successMessage}
                        </div>
                    )}

                    {stage === 'email' && (
                        <>
                            <h1 className="auth-title" style={{ fontSize: '36px', marginBottom: '12px', letterSpacing: '-1.5px' }}>Reset your password</h1>
                            <p className="auth-subtitle" style={{ fontSize: '16px', marginBottom: '32px' }}>Enter your email and we'll send an OTP.</p>
                            <form className="fp-form" onSubmit={handleSendOtp}>
                                <div className="auth-input-group" style={{ marginBottom: '24px' }}>
                                    <input
                                        type="email"
                                        className="auth-input"
                                        placeholder="name@work-email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ height: '52px', fontSize: '18px' }}
                                        required
                                    />
                                </div>
                                {error && <div className="auth-status-message auth-status-error">{error}</div>}
                                <button type="submit" className="auth-button">
                                    {loading ? 'Sending...' : 'Send OTP'}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px' }}>
                                    <Link to="/login" style={{ color: 'var(--color-text-muted)', fontWeight: '600', textDecoration: 'none' }}>Back to Login</Link>
                                </div>
                            </form>
                        </>
                    )}

                    {stage === 'resetPassword' && (
                        <>
                            <h1 className="auth-title" style={{ fontSize: '36px', marginBottom: '12px', letterSpacing: '-1.5px' }}>New Password</h1>
                            <p className="auth-subtitle" style={{ fontSize: '16px', marginBottom: '32px' }}>Secure your account with a new password.</p>
                            <form className="fp-form" onSubmit={handleResetPassword}>
                                <div className="auth-input-group">
                                    <div className="password-input-wrapper" style={{ position: 'relative' }}>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="auth-input"
                                            placeholder="New password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            style={{ height: '52px', fontSize: '18px' }}
                                            required
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
                                <div className="auth-input-group" style={{ marginBottom: '24px' }}>
                                    <div className="password-input-wrapper" style={{ position: 'relative' }}>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            className="auth-input"
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            style={{ height: '52px', fontSize: '18px' }}
                                            required
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
                                {error && <div className="auth-status-message auth-status-error">{error}</div>}
                                <button type="submit" className="auth-button">
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                                <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px' }}>
                                    <Link to="/login" style={{ color: 'var(--color-text-muted)', fontWeight: '600', textDecoration: 'none' }}>Back to Login</Link>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
