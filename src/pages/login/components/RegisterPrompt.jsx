import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegisterPrompt = () => {
  return (
    <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
            <Icon name="UserPlus" size={24} className="text-secondary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            New to InternYukti?
          </h3>
          <p className="text-muted-foreground">
            Create an account to save your internship preferences, track applications, and get personalized recommendations.
          </p>
        </div>

        <div className="space-y-3">
          <Link to="/register" className="block">
            <Button
              variant="secondary"
              size="default"
              fullWidth
              iconName="ArrowRight"
              iconPosition="right"
            >
              Create New Account
            </Button>
          </Link>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Check" size={14} className="text-success" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} className="text-success" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Zap" size={14} className="text-success" />
              <span>AI-powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPrompt;