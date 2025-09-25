import { API_BASE } from '../config';

// Enhanced API request function with better error handling
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  try {
    console.log('🌐 API Request:', options.method || 'GET', url);
    
    const response = await fetch(url, defaultOptions);
    
    // Handle different content types
    const contentType = response.headers.get('content-type') || '';
    let data = null;
    
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try { 
        data = text ? JSON.parse(text) : null; 
      } catch { 
        data = { message: text }; 
      }
    }

    if (!response.ok) {
      console.error('❌ API Error:', response.status, data);
      throw new Error(data?.error || data?.message || `HTTP ${response.status}`);
    }

    console.log('✅ API Success:', data);
    return { ok: true, data, status: response.status };
    
  } catch (error) {
    console.error('🔥 API Request failed:', error);
    
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return { 
        ok: false, 
        error: 'Tarmoq xatosi. Internet aloqasini tekshiring.', 
        status: 0 
      };
    }
    
    return { 
      ok: false, 
      error: error.message || 'Noma\'lum xatolik yuz berdi', 
      status: 0 
    };
  }
}

// Convenience methods
export const api = {
  get: (endpoint) => apiRequest(endpoint),
  post: (endpoint, data) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  put: (endpoint, data) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (endpoint) => apiRequest(endpoint, {
    method: 'DELETE'
  })
};

// Test API connection
export async function testConnection() {
  try {
    const result = await api.get('/api/health');
    console.log('🏥 Health check:', result);
    return result.ok;
  } catch (error) {
    console.error('🏥 Health check failed:', error);
    return false;
  }
}