import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, CheckCircle, AlertTriangle } from 'lucide-react';
import pb from '../lib/pocketbase';

const PocketBaseStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkPocketBaseConnection = async (signal?: AbortSignal) => {
    try {
      setError(null);
      // Try to get health status or any basic info
      await pb.health.check({ signal });
      setIsConnected(true);
    } catch (err: any) {
      if (err.isAbort || (err instanceof Error && err.name === 'AbortError')) {
        // This is expected on unmount in StrictMode, so we can ignore it.
        console.log('PocketBase health check request was cancelled.');
        return;
      }
      setIsConnected(false);
      setError('No se pudo conectar a PocketBase. Verificá la configuración.');
      console.error('PocketBase connection error:', err);
    }
  };
  
  useEffect(() => {
    const controller = new AbortController();
    
    checkPocketBaseConnection(controller.signal);

    // Cleanup function to abort the request on component unmount
    return () => {
      controller.abort();
    };
  }, []);


  if (isConnected === null) {
    return null; // Loading state
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-20 right-6 z-30 max-w-sm rounded-lg shadow-lg p-4 ${
        isConnected 
          ? 'bg-green-50 border border-green-200' 
          : 'bg-yellow-50 border border-yellow-200'
      }`}
    >
      <div className="flex items-start space-x-3">
        {isConnected ? (
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
        )}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <h4 className={`text-sm font-medium ${
              isConnected ? 'text-green-800' : 'text-yellow-800'
            }`}>
              PocketBase {isConnected ? 'Conectado' : 'Desconectado'}
            </h4>
          </div>
          <p className={`text-xs mt-1 ${
            isConnected ? 'text-green-700' : 'text-yellow-700'
          }`}>
            {isConnected 
              ? 'Base de datos lista para usar'
              : error || 'Usando datos de demostración'
            }
          </p>
          {!isConnected && (
            <button
              onClick={() => checkPocketBaseConnection()}
              className="text-xs text-yellow-800 underline hover:no-underline mt-1"
            >
              Reintentar conexión
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PocketBaseStatus;
