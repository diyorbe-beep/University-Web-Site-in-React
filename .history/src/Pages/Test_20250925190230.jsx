import React from 'react';
import { API_BASE } from '../config';

export default function Test() {
  const [results, setResults] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const testEndpoints = [
    { name: 'Health Check', url: '/api/health', method: 'GET' },
    { name: 'Services List', url: '/api/services', method: 'GET' },
    { name: 'Orders List', url: '/api/orders', method: 'GET' },
    { name: 'Root Path', url: '/', method: 'GET' },
  ];

  const testEndpoint = async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE}${endpoint.url}`, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.text();
      
      return {
        status: response.status,
        ok: response.ok,
        data: data,
        headers: Object.fromEntries(response.headers.entries())
      };
    } catch (error) {
      return {
        error: error.message,
        status: 0,
        ok: false
      };
    }
  };

  const runTests = async () => {
    setLoading(true);
    const newResults = {};
    
    for (const endpoint of testEndpoints) {
      console.log(`Testing ${endpoint.name}...`);
      newResults[endpoint.name] = await testEndpoint(endpoint);
    }
    
    setResults(newResults);
    setLoading(false);
  };

  React.useEffect(() => {
    runTests();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Backend Test Sahifasi</h1>
      <p><strong>Backend URL:</strong> {API_BASE}</p>
      
      <button 
        onClick={runTests} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          background: '#34b3f1',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Test qilinmoqda...' : 'Qayta test qilish'}
      </button>

      {Object.keys(results).length > 0 && (
        <div>
          <h2>Test natijalari:</h2>
          {testEndpoints.map((endpoint) => {
            const result = results[endpoint.name];
            if (!result) return null;

            return (
              <div 
                key={endpoint.name}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  padding: '15px',
                  marginBottom: '10px',
                  backgroundColor: result.ok ? '#f0f8f0' : '#f8f0f0'
                }}
              >
                <h3 style={{ margin: '0 0 10px 0', color: result.ok ? 'green' : 'red' }}>
                  {endpoint.name} - {result.ok ? '✅ Muvaffaqiyatli' : '❌ Xatolik'}
                </h3>
                <p><strong>URL:</strong> {endpoint.method} {API_BASE}{endpoint.url}</p>
                <p><strong>Status:</strong> {result.status}</p>
                
                {result.error && (
                  <p><strong>Xatolik:</strong> {result.error}</p>
                )}
                
                {result.data && (
                  <details>
                    <summary>Response ma'lumotlari</summary>
                    <pre style={{ 
                      background: '#f5f5f5', 
                      padding: '10px', 
                      borderRadius: '3px',
                      overflow: 'auto',
                      fontSize: '12px'
                    }}>
                      {result.data}
                    </pre>
                  </details>
                )}
                
                {result.headers && (
                  <details>
                    <summary>Headers</summary>
                    <pre style={{ 
                      background: '#f5f5f5', 
                      padding: '10px', 
                      borderRadius: '3px',
                      overflow: 'auto',
                      fontSize: '12px'
                    }}>
                      {JSON.stringify(result.headers, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}