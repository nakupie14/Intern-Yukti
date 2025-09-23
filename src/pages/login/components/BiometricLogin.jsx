import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const BiometricLogin = ({ onBiometricLogin, isLoading }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // Check if WebAuthn is supported
    if (window.PublicKeyCredential) {
      setIsSupported(true);
      
      // Check if biometric authentication is available
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()?.then(available => {
          setIsAvailable(available);
        })?.catch(() => {
          setIsAvailable(false);
        });
    }
  }, []);

  const handleBiometricLogin = async () => {
    if (!isSupported || !isAvailable) return;

    try {
      // Mock biometric authentication
      const mockCredential = {
        id: 'mock-credential-id',
        type: 'public-key',
        response: {
          authenticatorData: new ArrayBuffer(8),
          clientDataJSON: new ArrayBuffer(8),
          signature: new ArrayBuffer(8)
        }
      };

      if (onBiometricLogin) {
        onBiometricLogin(mockCredential);
      }
    } catch (error) {
      console.error('Biometric authentication failed:', error);
    }
  };

  if (!isSupported || !isAvailable) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-medium">
            Quick Access
          </span>
        </div>
      </div>

      <div className="mt-4">
        <Button
          variant="outline"
          size="default"
          onClick={handleBiometricLogin}
          disabled={isLoading}
          className="w-full justify-center"
          iconName="Fingerprint"
          iconPosition="left"
        >
          Use Biometric Login
        </Button>
      </div>
    </div>
  );
};

export default BiometricLogin;