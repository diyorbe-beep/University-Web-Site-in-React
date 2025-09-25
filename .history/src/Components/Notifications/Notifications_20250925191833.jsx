import React from 'react';
import { io } from 'socket.io-client';
import { API_BASE } from '../../config';
import { requestJson } from '../../lib/api';
import './Notifications.css';

export default function Notifications({ userEmail }) {
  const [notifications, setNotifications] = React.useState([]);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [unreadCount, setUnreadCount] = React.useState(0);

  React.useEffect(() => {
    if (userEmail) {
      loadNotifications();
    }
  }, [userEmail]);

  React.useEffect(() => {
    const socket = io(API_BASE, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true
    });
    
    socket.on('connect', () => {
      console.log('Notifications Socket connected');
    });
    
    socket.on('disconnect', () => {
      console.log('Notifications Socket disconnected');
    });
    
    socket.on('notification:new', (notification) => {
      if (notification.userEmail === userEmail) {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Show browser notification if permission granted
        if (Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/favicon.ico'
          });
        }
      }
    });

    return () => socket.disconnect();
  }, [userEmail]);

  async function loadNotifications() {
    const response = await requestJson(`${API_BASE}/notifications?userEmail=${userEmail}`);
    if (response.ok) {
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.read).length);
    }
  }

  async function markAsRead(id) {
    const response = await requestJson(`${API_BASE}/api/notifications/${id}/read`, {
      method: 'PUT'
    });
    if (response.ok) {
      setNotifications(prev => 
        prev.map(n => n._id === id ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  }

  function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  React.useEffect(() => {
    requestNotificationPermission();
  }, []);

  if (!userEmail) return null;

  return (
    <div className="notifications-wrapper">
      <button 
        className="notifications-bell"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="notifications-badge">{unreadCount}</span>
        )}
      </button>

      {showNotifications && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Xabarlar</h3>
            <button 
              className="notifications-close"
              onClick={() => setShowNotifications(false)}
            >
              ×
            </button>
          </div>
          
          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="notifications-empty">Xabarlar yo'q</div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification._id}
                  className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`}
                  onClick={() => !notification.read && markAsRead(notification._id)}
                >
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">
                    {new Date(notification.createdAt).toLocaleString('uz-UZ')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}