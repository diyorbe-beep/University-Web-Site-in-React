import React from 'react';
import { API_BASE } from '../config';
import { requestJson } from '../lib/api';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = React.useState(null);
  const [orders, setOrders] = React.useState([]);
  const [openOrder, setOpenOrder] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const me = await requestJson(`${API_BASE}/api/auth/me`);
      if (me.ok) setUser(me.data.user);
      const list = await requestJson(`${API_BASE}/api/orders`);
      if (list.ok) {
        if (me?.data?.user?.email) {
          setOrders(list.data.filter(o => (o.userEmail || o?.service?.userEmail) === me.data.user.email));
        } else {
          setOrders(list.data);
        }
      }
    })();
  }, []);

  if (!user) return <div className="profile-wrapper">Profil yuklanmoqda...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2 className="profile-title">Profil</h2>
        <div className="profile-row"><span>Ism:</span> <b>{user.name}</b></div>
        <div className="profile-row"><span>Email:</span> <b>{user.email}</b></div>
      </div>

      <div className="orders-section">
        <h3 className="orders-title">Mening buyurtmalarim</h3>
        {orders.length === 0 && <div className="orders-empty">Hozircha buyurtmalar yo‘q</div>}
        {orders.map(o => (
          <div key={o._id} className="order-card">
            <div className="order-head"><b>{o.firstName} {o.lastName}</b> — {o.phone}</div>
            <div className="order-line">{o.address}</div>
            <div className="order-line">Status: <b className={`status-badge status-${o.status}`}>{o.status}</b></div>
            <div className="order-line">Xizmat: {o?.service?.name}</div>
            <div className="order-actions">
              <button className="order-btn" onClick={() => setOpenOrder(o)}>Batafsil</button>
            </div>
          </div>
        ))}
      </div>

      {openOrder && (
        <div className="modal-overlay" onClick={() => setOpenOrder(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Buyurtma tafsilotlari</h3>
              <button className="modal-close" onClick={() => setOpenOrder(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-row"><span>Ism:</span><b>{openOrder.firstName} {openOrder.lastName}</b></div>
              {openOrder.middleName && <div className="modal-row"><span>Otasining ismi:</span><b>{openOrder.middleName}</b></div>}
              {openOrder.organization && <div className="modal-row"><span>Tashkilot:</span><b>{openOrder.organization}</b></div>}
              <div className="modal-row"><span>Telefon:</span><b>{openOrder.phone}</b></div>
              {openOrder.phone2 && <div className="modal-row"><span>Qo'shimcha tel:</span><b>{openOrder.phone2}</b></div>}
              <div className="modal-row"><span>Manzil:</span><b>{openOrder.address}</b></div>
              {openOrder.position && <div className="modal-row"><span>Lavozim:</span><b>{openOrder.position}</b></div>}
              {openOrder.message && <div className="modal-row"><span>Izoh:</span><b>{openOrder.message}</b></div>}
              <div className="modal-row"><span>Xizmat:</span><b>{openOrder?.service?.name}</b></div>
              <div className="modal-row"><span>Holat:</span><b className={`status-badge status-${openOrder.status}`}>{openOrder.status}</b></div>
            </div>
            <div className="modal-footer">
              <button className="order-btn" onClick={() => setOpenOrder(null)}>Yopish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
