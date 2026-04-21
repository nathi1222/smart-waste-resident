import React, { useState } from 'react';

interface BiometricLoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

const BiometricLogin: React.FC<BiometricLoginProps> = ({ onSuccess, onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');

  const handleBiometricLogin = () => {
    setIsScanning(true);
    setError('');
    
    // Check if fingerprint/face recognition is available
    if (window.PublicKeyCredential && 
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then(available => {
          if (available) {
            // Simulate biometric authentication
            setTimeout(() => {
              setIsScanning(false);
              onSuccess();
            }, 2000);
          } else {
            setError('Biometric authentication not available on this device');
            setIsScanning(false);
          }
        });
    } else {
      // Fallback for demo - simulate success
      setTimeout(() => {
        setIsScanning(false);
        onSuccess();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-12 flex items-center px-5 pt-4">
        <button onClick={onBack} className="text-gray-600 text-2xl">←</button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 transition-all ${
            isScanning ? 'bg-green-100 animate-pulse' : 'bg-gray-100'
          }`}>
            <span className="text-5xl">{isScanning ? '🔓' : '👆'}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Biometric Login</h2>
          <p className="text-gray-500 text-sm mb-6">
            {isScanning 
              ? 'Scanning your fingerprint...' 
              : 'Use your fingerprint or face ID to login securely'}
          </p>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          
          {!isScanning && (
            <button
              onClick={handleBiometricLogin}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition"
            >
              <span className="mr-2">🔐</span>
              Scan Fingerprint
            </button>
          )}
          
          <div className="mt-6">
            <button onClick={onBack} className="text-gray-400 text-sm">
              Use password instead →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricLogin;