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
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

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

  // Filter orders based on search and status
  const filteredOrders = React.useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = searchTerm === '' || 
        order.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.includes(searchTerm) ||
        order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.service?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

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
          <div className="orders-header">
            <h3 className="admin-subtitle">
              Buyurtmalar ({filteredOrders.length}/{orders.length})
            </h3>
            
            {/* Statistics */}
            <div className="orders-stats">
              <div className="stat-item pending">
                <span className="stat-number">{orders.filter(o => o.status === 'pending').length}</span>
                <span className="stat-label">Kutilmoqda</span>
              </div>
              <div className="stat-item approved">
                <span className="stat-number">{orders.filter(o => o.status === 'approved').length}</span>
                <span className="stat-label">Qabul qilindi</span>
              </div>
              <div className="stat-item rejected">
                <span className="stat-number">{orders.filter(o => o.status === 'rejected').length}</span>
                <span className="stat-label">Rad etildi</span>
              </div>
            </div>
            
            <div className="orders-controls">
              <input
                type="text"
                placeholder="Qidirish (ism, telefon, email...)"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Barcha statuslar</option>
                <option value="pending">Kutilmoqda</option>
                <option value="approved">Qabul qilindi</option>
                <option value="rejected">Rad etildi</option>
              </select>
            </div>
          </div>
          
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <i className="empty-icon">
                {orders.length === 0 ? '📋' : '🔍'}
              </i>
              <p>
                {orders.length === 0 
                  ? 'Hozircha buyurtmalar yo\'q' 
                  : 'Qidiruv bo\'yicha natija topilmadi'
                }
              </p>
            </div>
          ) : (
            filteredOrders.map((o) => (
              <div key={o._id} className="order-item">
                <div className="order-main">
                  <div className="order-line">
                    <b>{o.firstName} {o.lastName}</b>
                    {o.middleName && <span> ({o.middleName})</span>}
                    <span className="order-phone"> — 📞 {o.phone}</span>
                    {o.phone2 && <span className="order-phone2"> / {o.phone2}</span>}
                  </div>
                  {o.userEmail && (
                    <div className="order-line">
                      📧 <span className="order-email">{o.userEmail}</span>
                    </div>
                  )}
                  <div className="order-line">📍 {o.address}</div>
                  {o.organization && (
                    <div className="order-line">🏢 {o.organization}</div>
                  )}
                  {o.position && (
                    <div className="order-line">💼 {o.position}</div>
                  )}
                  <div className="order-line">
                    🛠️ <b>{o?.service?.name || 'Xizmat ko\'rsatilmagan'}</b>
                    {o?.service?.price && <span className="service-price"> — {o.service.price}</span>}
                  </div>
                  {o.message && (
                    <div className="order-line order-message">
                      💬 <em>{o.message}</em>
                    </div>
                  )}
                  <div className="order-line order-date">
                    🕒 {new Date(o.createdAt).toLocaleString('uz-UZ')}
                    {o.updatedAt && o.updatedAt !== o.createdAt && (
                      <span className="updated-date">
                        (yangilangan: {new Date(o.updatedAt).toLocaleString('uz-UZ')})
                      </span>
                    )}
                  </div>
                </div>
                <div className="order-meta">
                  <span className={`status-badge status-${o.status}`}>
                    {o.status === 'pending' ? '⏳ Kutilmoqda' : 
                     o.status === 'approved' ? '✅ Qabul qilindi' : 
                     '❌ Rad etildi'}
                  </span>
                  <div className="order-buttons">
                    {o.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => updateStatus(o._id, 'approved')} 
                          className="admin-btn small success"
                          title="Buyurtmani ma'qullash"
                        >
                          ✓ Ma'qullash
                        </button>
                        <button 
                          onClick={() => updateStatus(o._id, 'rejected')} 
                          className="admin-btn small warning"
                          title="Buyurtmani rad etish"
                        >
                          ✗ Rad etish
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => deleteOrder(o._id)} 
                      className="admin-btn small danger"
                      title="Buyurtmani butunlay o'chirish"
                    >
                      🗑️ O'chirish
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
