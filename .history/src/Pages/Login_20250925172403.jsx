import React from 'react';
import { API_BASE } from '../config';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { requestJson } from '../lib/api';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const eMail = (email || '').trim().toLowerCase();
    const pass = (password || '').trim();

    if (!eMail || !pass) {
      setError('Email va parol kiritish majburiy');
      setLoading(false);
      return;
    }

    try {
      // Admin shortcut
      if (eMail === 'admin@local') {
        const { ok, data, status } = await requestJson(`${API_BASE}/api/auth/admin-login`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: eMail, password: pass })
        });
        if (!ok) { 
          setError(data?.error || `Admin login xatosi (kod: ${status})`); 
          setLoading(false);
          return; 
        }
        try { localStorage.setItem('token', data.token); localStorage.setItem('isAdmin', 'true'); } catch {}
        setSuccess('Muvaffaqiyatli kirish! Admin panelga yo\'naltirilmoqda...');
        setTimeout(() => navigate('/admin'), 1500);
        return;
      }

      // Normal user login
      const { ok, data, status } = await requestJson(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: eMail, password: pass })
      });
      if (!ok) {
        const msg = data?.error || data?.message || `Xatolik (kod: ${status})`;
        setError(msg);
        setLoading(false);
        return;
      }
      try { localStorage.setItem('token', data.token); localStorage.removeItem('isAdmin'); } catch {}
      setSuccess('Muvaffaqiyatli kirish! Profil sahifasiga yo\'naltirilmoqda...');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      setError('Tarmoq xatosi. Qaytadan urinib ko\'ring.');
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card login-card">
        <div className="auth-header">
          <div className="auth-logo">
            <img src="/Images/White Logo.png" alt="ASTI Logo" className="auth-logo-img" />
            <h1><span>ASTI</span> Interactive Services</h1>
          </div>
          <h2 className="auth-title">Tizimga kirish</h2>
          <p className="auth-subtitle">Hisobingizga kirish uchun ma'lumotlarni kiriting</p>
        </div>

        {error && <div className="auth-msg error">
          <i className="error-icon">⚠️</i>
          {error}
        </div>}
        {success && <div className="auth-msg success">
          <i className="success-icon">✅</i>
          {success}
        </div>}

        <form onSubmit={login} className="auth-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email manzil</label>
            <div className="input-wrapper">
              <i className="input-icon">📧</i>
              <input 
                id="email"
                type="email"
                className="auth-input" 
                placeholder="example@email.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Parol</label>
            <div className="input-wrapper">
              <i className="input-icon">🔒</i>
              <input 
                id="password"
                type="password"
                className="auth-input" 
                placeholder="Parolingizni kiriting" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`auth-button login-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Kirilmoqda...
              </>
            ) : (
              <>
                <i className="button-icon">🚀</i>
                Kirish
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-text">
            Hisobingiz yo'qmi? 
            <Link to="/register" className="auth-link"> Ro'yxatdan o'ting</Link>
          </p>
          <div className="auth-divider">
            <span>yoki</span>
          </div>
          <p className="admin-hint">
            <i>💡</i> Admin kirish uchun: admin@local
          </p>
        </div>
      </div>
    </div>
  );
}