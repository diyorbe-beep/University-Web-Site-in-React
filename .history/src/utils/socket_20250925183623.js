import { io } from 'socket.io-client';
import { API_BASE } from '../config';

// Socket.IO connection options for production
export const socketOptions = {
  transports: ['websocket', 'polling'],
  timeout: 20000,
  forceNew: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  maxReconnectionAttempts: 5
};

// Create socket connection with error handling
export function createSocket() {
  const socket = io(API_BASE, socketOptions);
  
  socket.on('connect', () => {
    console.log('✅ Socket connected to:', API_BASE);
  });
  
  socket.on('disconnect', (reason) => {
    console.log('❌ Socket disconnected:', reason);
  });
  
  socket.on('connect_error', (error) => {
    console.error('🔥 Socket connection error:', error);
  });
  
  socket.on('reconnect', (attemptNumber) => {
    console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
  });
  
  socket.on('reconnect_error', (error) => {
    console.error('🔥 Socket reconnection error:', error);
  });
  
  return socket;
}

// Helper function to safely emit events
export function safeEmit(socket, event, data) {
  if (socket && socket.connected) {
    socket.emit(event, data);
    return true;
  } else {
    console.warn('⚠️ Socket not connected, cannot emit:', event);
    return false;
  }
}