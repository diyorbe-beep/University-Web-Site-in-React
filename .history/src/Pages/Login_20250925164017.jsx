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
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    const eMail = (email || '').trim().toLowerCase();
    const pass = (password || '').trim();

    // Admin shortcut
    if (eMail === 'admin@local') {
      const { ok, data, status } = await requestJson(`${API_BASE}/api/auth/admin-login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: eMail, password: pass })
      });
      if (!ok) { setError(data?.error || `Admin login xatosi (kod: ${status})`); return; }
      try { localStorage.setItem('token', data.token); localStorage.setItem('isAdmin', 'true'); } catch {}
      navigate('/admin');
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
      return;
    }
    try { localStorage.setItem('token', data.token); localStorage.removeItem('isAdmin'); } catch {}
    navigate('/profile');
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Kirish</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <form onSubmit={login}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Parol" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Kirish</button>
        </div>
      </form>
      <Link to="/register" className="auth-link">Akkaunt yo‘qmi?</Link>
    </div>
  );
}
