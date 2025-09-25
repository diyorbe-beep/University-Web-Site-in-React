import React from 'react';
import { io } from 'socket.io-client';
import { API_BASE } from '../config';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import Notifications from '../Components/Notifications/Notifications';

export default function Admin() {
  const [token, setToken] = React.useState(() => localStorage.getItem('token') || '');
  const [orders, setOrders] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const [svcName, setSvcName] = React.useState('');
  const [svcDesc, setSvcDesc] = React.useState('');
  const [svcPrice, setSvcPrice] = React.useState('');
  const [svcVideo, setSvcVideo] = React.useState('');
  const [svcPerson, setSvcPerson] = React.useState('');

  const navigate = useNavigate();

  const headers = React.useMemo(() => ({ 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }), [token]);

  React.useEffect(() => {
    if (token) {
      loadOrders(token);
      loadServices();
    }
  }, [token]);

  React.useEffect(() => {
    const socket = io(API_BASE);
    socket.on('orders:new', (order) => {
      setOrders((prev) => [order, ...prev]);
    });
    socket.on('orders:updated', (order) => {
      setOrders((prev) => prev.map((o) => (o._id === order._id ? order : o)));
    });
    socket.on('orders:deleted', (data) => {
      setOrders((prev) => prev.filter((o) => o._id !== data.id));
    });
    return () => socket.disconnect();
  }, []);

  async function login(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Login failed');
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', 'true');
      await Promise.all([loadOrders(data.token), loadServices()]);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  }

  async function loadOrders(bearer) {
    const res = await fetch(`${API_BASE}/api/orders`, {
      headers: { Authorization: `Bearer ${bearer || token}` }
    });
    const data = await res.json();
    if (res.ok) setOrders(data);
  }

  async function loadServices() {
    const res = await fetch(`${API_BASE}/api/services`);
    const data = await res.json();
    if (res.ok) setServices(data);
  }

  async function deleteService(id) {
    if (!confirm('Ushbu xizmatni o\'chirmoqchimisiz?')) return;
    const res = await fetch(`${API_BASE}/api/services/${id}`, { method: 'DELETE', headers });
    if (res.ok) {
      setServices(prev => prev.filter(s => s._id !== id));
    }
  }

  async function updateStatus(id, status) {
    if (!token) return;
    const res = await fetch(`${API_BASE}/api/orders/${id}/status`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (res.ok) {
      setOrders((prev) => prev.map((o) => (o._id === id ? data : o)));
    }
  }

  async function deleteOrder(id) {
    if (!confirm('Ushbu buyurtmani o\'chirmoqchimisiz? Bu amalni qaytarib bo\'lmaydi.')) return;
    if (!token) return;
    
    const res = await fetch(`${API_BASE}/api/orders/${id}`, {
      method: 'DELETE',
      headers
    });
    
    if (res.ok) {
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } else {
      const data = await res.json();
      alert(data?.error || 'Buyurtmani o\'chirishda xatolik yuz berdi');
    }
  }

  async function createService(e) {
    e.preventDefault();
    if (!token) return;
    const res = await fetch(`${API_BASE}/api/services`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: svcName, description: svcDesc, price: svcPrice, videoSrc: svcVideo, person: svcPerson })
    });
    const data = await res.json();
    if (res.ok) {
      setServices(prev => [data, ...prev]);
      setSvcName(''); setSvcDesc(''); setSvcPrice(''); setSvcVideo(''); setSvcPerson('');
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setToken('');
  }

  if (!token) {
    return (
      <div className="admin-wrapper">
        <div className="admin-card admin-login">
          <h2 className="admin-title">Admin login</h2>
          {error && <div className="admin-msg error">{error}</div>}
          <form onSubmit={login} className="admin-form">
            <input className="admin-input" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="admin-input" placeholder="Parol" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="admin-btn">Kirish</button>
          </form>
          <div className="admin-hint">Agar admin yo'q bo'lsa, backend: POST /api/auth/seed-admin</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <div className="admin-topbar">
        <h2 className="admin-title">Admin panel</h2>
        <div className="admin-actions">
          <Notifications userEmail="admin@local" />
          <button onClick={() => { loadOrders(); loadServices(); }} className="admin-btn ghost">Yangilash</button>
          <button onClick={logout} className="admin-btn danger">Chiqish</button>
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h3 className="admin-subtitle">Yangi xizmat qo'shish</h3>
          <form onSubmit={createService} className="admin-form grid">
            <input className="admin-input" placeholder="Nomi" value={svcName} onChange={(e) => setSvcName(e.target.value)} />
            <input className="admin-input" placeholder="Narxi" value={svcPrice} onChange={(e) => setSvcPrice(e.target.value)} />
            <input className="admin-input" placeholder="Video URL" value={svcVideo} onChange={(e) => setSvcVideo(e.target.value)} />
            <input className="admin-input" placeholder="Mas'ul shaxs" value={svcPerson} onChange={(e) => setSvcPerson(e.target.value)} />
            <input className="admin-input" placeholder="Tavsif" value={svcDesc} onChange={(e) => setSvcDesc(e.target.value)} />
            <div className="admin-form-actions">
              <button type="submit" className="admin-btn">Qo'shish</button>
            </div>
          </form>
          <div className="admin-hint">Qo'shilgan xizmatlar foydalanuvchilarga "/services" sahifasida ko'rinadi.</div>
          <div style={{ marginTop: 12 }}>
            {services.map(s => (
              <div key={s._id} className="order-item">
                <div>
                  <div className="order-line"><b>{s.name}</b> — {s.price}</div>
                  <div className="order-line">{s.description}</div>
                </div>
                <div className="order-buttons">
                  <button className="admin-btn small danger" onClick={() => deleteService(s._id)}>O'chirish</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h3 className="admin-subtitle">Buyurtmalar</h3>
          {orders.map((o) => (
            <div key={o._id} className="order-item">
              <div className="order-main">
                <div className="order-line"><b>{o.firstName} {o.lastName}</b> — {o.phone} {o.userEmail && (<span className="order-email">({o.userEmail})</span>)}</div>
                <div className="order-line">{o.address}</div>
                <div className="order-line">Xizmat: {o?.service?.name}</div>
              </div>
              <div className="order-meta">
                <span className={`status-badge status-${o.status}`}>{o.status}</span>
                <div className="order-buttons">
                  <button onClick={() => updateStatus(o._id, 'approved')} className="admin-btn small">Ma'qullash</button>
                  <button onClick={() => updateStatus(o._id, 'rejected')} className="admin-btn small danger">Rad etish</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
