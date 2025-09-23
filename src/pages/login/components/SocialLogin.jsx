import React from 'react';

import Button from '../../../components/ui/Button';

const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    }
  ];

  const handleSocialLogin = (provider) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-medium">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            size="default"
            onClick={() => handleSocialLogin(provider?.id)}
            disabled={isLoading}
            className="w-full justify-center"
            iconName={provider?.icon}
            iconPosition="left"
          >
            <span className="ml-2">{provider?.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;