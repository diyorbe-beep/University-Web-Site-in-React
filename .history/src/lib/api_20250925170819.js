export async function requestJson(url, options = {}) {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Add Authorization header if token exists
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const res = await fetch(url, {
      ...options,
      headers
    });
    
    const contentType = res.headers.get('content-type') || '';
    let body = null;
    if (contentType.includes('application/json')) {
      body = await res.json();
    } else {
      const text = await res.text();
      try { body = text ? JSON.parse(text) : null; } catch { body = { message: text } }
    }
    return { ok: res.ok, status: res.status, data: body };
  } catch (e) {
    return { ok: false, status: 0, data: { error: e.message } };
  }
}
