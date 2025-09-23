import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialRegistration = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    }
  ];

  const handleSocialRegister = async (provider) => {
    setLoadingProvider(provider?.id);

    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social registration
      const userData = {
        id: Date.now(),
        fullName: provider?.id === 'google' ? 'John Doe' : 'Jane Smith',
        email: provider?.id === 'google' ? 'john.doe@gmail.com' : 'jane.smith@linkedin.com',
        educationLevel: 'undergraduate',
        preferredLanguage: 'en',
        provider: provider?.id,
        createdAt: new Date()?.toISOString()
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('registrationComplete', 'true');
      
      // Navigate to landing page
      navigate('/landing-page', { 
        state: { 
          message: `Account created successfully with ${provider?.name}!`,
          type: 'success'
        }
      });
      
    } catch (error) {
      console.error(`${provider?.name} registration failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialRegister(provider)}
            loading={loadingProvider === provider?.id}
            disabled={loadingProvider !== null}
            className={`${provider?.bgColor} border-border`}
          >
            <div className="flex items-center justify-center space-x-3">
              <Icon 
                name={provider?.icon} 
                size={20} 
                className={provider?.color}
              />
              <span className="font-medium">
                {loadingProvider === provider?.id 
                  ? `Connecting to ${provider?.name}...` 
                  : `Continue with ${provider?.name}`
                }
              </span>
            </div>
          </Button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;