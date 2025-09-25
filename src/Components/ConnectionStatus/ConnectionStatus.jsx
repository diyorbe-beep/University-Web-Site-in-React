import React from 'react';
import { testConnection } from '../../utils/api';
import './ConnectionStatus.css';

export default function ConnectionStatus() {
  const [isConnected, setIsConnected] = React.useState(null);
  const [isChecking, setIsChecking] = React.useState(false);

  const checkConnection = React.useCallback(async () => {
    setIsChecking(true);
    const connected = await testConnection();
    setIsConnected(connected);
    setIsChecking(false);
  }, []);

  React.useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, [checkConnection]);

  if (isConnected === null) {
    return (
      <div className="connection-status checking">
        <span className="status-indicator"></span>
        <span>Ulanish tekshirilmoqda...</span>
      </div>
    );
  }

  return (
    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
      <span className="status-indicator"></span>
      <span>
        {isConnected ? 'Ulangan' : 'Ulanmagan'}
        {isChecking && ' (tekshirilmoqda...)'}
      </span>
      {!isConnected && (
        <button onClick={checkConnection} className="retry-btn" disabled={isChecking}>
          Qayta urinish
        </button>
      )}
    </div>
  );
}