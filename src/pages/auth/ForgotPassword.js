import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import '../../styles/auth.css';
const ForgotPassword = () => {
  const [email,     setEmail]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [message,   setMessage]   = useState('');
  const [error,     setError]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const { data } = await authAPI.forgotPassword({ email });
      setMessage(data.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🔑</div>
          <h1>Forgot Password</h1>
          <p>{submitted ? 'Check your email inbox' : 'Enter your registered email'}</p>
        </div>

        {error   && <div className="auth-error">⚠️ {error}</div>}
        {message && <div className="auth-success">✅ {message}</div>}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Enter your registered email"
                required
                autoFocus
              />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <p className="auth-link">
              Didn't receive it?{' '}
              <button
                onClick={() => { setSubmitted(false); setMessage(''); }}
                style={{
                  background: 'none', border: 'none',
                  color: '#1d4ed8', cursor: 'pointer', fontWeight: 600, fontSize: 13
                }}
              >
                Try again
              </button>
            </p>
          </div>
        )}

        <p className="auth-link">
          <Link to="/login">← Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;