import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-4">
      {/* Logo */}
      <Link 
        to="/landing-page" 
        className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
      >
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={24} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">InternYukti</span>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome Back!
        </h1>
        <p className="text-muted-foreground text-lg">
          Sign in to access your personalized internship recommendations
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;