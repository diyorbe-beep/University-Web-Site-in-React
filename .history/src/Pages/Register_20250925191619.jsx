import React from 'react';
import { API_BASE } from '../config';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { requestJson } from '../lib/api';

export default function Register() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!name || !email || !password) {
      setError('Barcha maydonlarni to\'ldirish majburiy');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
      setLoading(false);
      return;
    }

    try {
      const { ok, data, status } = await requestJson(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!ok) {
        const msg = data?.error || data?.message || `Xatolik (kod: ${status})`;
        setError(msg);
        setLoading(false);
        return;
      }
      try { localStorage.setItem('token', data.token); } catch {}
      setSuccess('Muvaffaqiyatli ro\'yxatdan o\'tdingiz! Profil sahifasiga yo\'naltirilmoqda...');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      setError('Tarmoq xatosi. Qaytadan urinib ko\'ring.');
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="auth-logo">
            <img src="/Images/White Logo.png" alt="ASTI Logo" className="auth-logo-img" />
            <h1><span>ASTI</span> Interactive Services</h1>
          </div>
          <h2 className="auth-title">Ro'yxatdan o'tish</h2>
          <p className="auth-subtitle">Yangi akkaunt yaratish uchun ma'lumotlarni kiriting</p>
        </div>

        {error && <div className="auth-msg error">
          <i className="error-icon">⚠️</i>
          {error}
        </div>}
        {success && <div className="auth-msg success">
          <i className="success-icon">✅</i>
          {success}
        </div>}

        <form onSubmit={register} className="auth-form">
          <div className="input-group">
            <label htmlFor="name" className="input-label">To'liq ism</label>
            <div className="input-wrapper">
              <i className="input-icon">👤</i>
              <input 
                id="name"
                type="text"
                className="auth-input" 
                placeholder="Ismingizni kiriting" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

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
                placeholder="Kuchli parol kiriting (kamida 6 ta belgi)" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`auth-button register-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Ro'yxatdan o'tilmoqda...
              </>
            ) : (
              <>
                <i className="button-icon">🎉</i>
                Ro'yxatdan o'tish
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-text">
            Allaqachon akkauntingiz bormi? 
            <Link to="/login" className="auth-link"> Kirish</Link>
          </p>
        </div>
      </div>
    </div>
  );
}