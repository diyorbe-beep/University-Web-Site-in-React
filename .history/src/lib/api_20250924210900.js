export async function requestJson(url, options = {}) {
  try {
    const res = await fetch(url, options);
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
