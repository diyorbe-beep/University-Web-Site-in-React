// Backend URL configuration
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

export const API_BASE = isProduction 
  ? 'https://universitet-backend.onrender.com'
  : 'http://localhost:4000';

// Agar doim production backend ishlatmoqchi bo'lsangiz:
// export const API_BASE = 'https://universitet-backend.onrender.com';

console.log('API_BASE:', API_BASE);
