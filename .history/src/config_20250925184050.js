// Backend URL configuration
export const API_BASE = import.meta.env.VITE_API_BASE || 'https://universitet-backend.onrender.com';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'ASTI Interactive Services';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// Environment info
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

console.log('🌍 Environment:', import.meta.env.MODE);
console.log('🔗 API_BASE:', API_BASE);
console.log('📱 APP_NAME:', APP_NAME);
