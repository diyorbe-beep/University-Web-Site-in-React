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
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    const { ok, data, status } = await requestJson(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!ok) {
      const msg = data?.error || data?.message || `Xatolik (kod: ${status})`;
      setError(msg);
      return;
    }
    try { localStorage.setItem('token', data.token); } catch {}
    setSuccess('Muvaffaqiyatli! Profil sahifasiga yo\'naltirilmoqda...');
    navigate('/profile');
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Ro‘yxatdan o‘tish</h2>
        <p className="auth-subtitle">Akkaunt yaratish uchun ma’lumotlarni kiriting.</p>
        {error && <div className="auth-msg error">{error}</div>}
        {success && <div className="auth-msg success">{success}</div>}
        <form onSubmit={register} className="auth-form">
          <input className="auth-input" placeholder="Ism" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="auth-input" placeholder="Parol" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="auth-actions">
            <button type="submit" className="auth-button">Ro‘yxatdan o‘tish</button>
            <Link to="/login" className="auth-link">Allaqachon akkauntingiz bormi?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
