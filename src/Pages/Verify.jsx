import React from 'react';
import { API_BASE } from '../config';
import { requestJson } from '../lib/api';
import './Auth.css';
import { useLocation, Link } from 'react-router-dom';

export default function Verify() {
  const { state } = useLocation();
  const [email, setEmail] = React.useState(state?.email || '');
  const [code, setCode] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [err, setErr] = React.useState('');

  async function submit(e) {
    e.preventDefault();
    setErr(''); setMsg('');
    const { ok, data, status } = await requestJson(`${API_BASE}/api/auth/verify`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, code })
    });
    if (!ok) { setErr(data?.error || `Xatolik (${status})`); return; }
    try { localStorage.setItem('token', data.token); } catch {}
    setMsg('Tasdiq muvaffaqiyatli. Endi profil sahifasiga o‘ting.');
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Email tasdiqlash</h2>
        {err && <div className="auth-msg error">{err}</div>}
        {msg && <div className="auth-msg success">{msg} <Link to="/profile">Profil</Link></div>}
        <form onSubmit={submit} className="auth-form">
          <input className="auth-input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="auth-input" placeholder="Kod (6 raqam)" value={code} onChange={e=>setCode(e.target.value)} />
          <div className="auth-actions">
            <button className="auth-button" type="submit">Tasdiqlash</button>
          </div>
        </form>
      </div>
    </div>
  );
}
