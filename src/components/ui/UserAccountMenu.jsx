import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserAccountMenu = ({ className = '' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('userData');
    
    setIsAuthenticated(authStatus === 'true');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    navigate('/login');
    setIsOpen(false);
  };

  const handleRegister = () => {
    navigate('/register');
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    setIsOpen(false);
    
    // Dispatch custom event for logout
    window.dispatchEvent(new CustomEvent('userLogout'));
    
    // Redirect to landing page
    navigate('/landing-page');
  };

  const menuItems = [
    {
      label: 'My Results',
      icon: 'TrendingUp',
      path: '/internship-results',
      description: 'View your internship recommendations'
    },
    {
      label: 'Saved Internships',
      icon: 'Bookmark',
      path: '/internship-results?filter=saved',
      description: 'Your bookmarked opportunities'
    },
    {
      label: 'Profile Settings',
      icon: 'Settings',
      path: '/profile',
      description: 'Manage your account settings'
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      path: '/help',
      description: 'Get help and support'
    }
  ];

  if (!isAuthenticated) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogin}
          iconName="LogIn"
          iconPosition="left"
        >
          Login
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleRegister}
          iconName="UserPlus"
          iconPosition="left"
        >
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 min-h-touch rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Account menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
          {user?.name ? (
            <span className="text-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          ) : (
            <Icon name="User" size={16} />
          )}
        </div>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-medium">
            {user?.name || 'Account'}
          </span>
          {user?.email && (
            <span className="text-xs text-muted-foreground">
              {user?.email}
            </span>
          )}
        </div>
        <Icon 
          name="ChevronDown" 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-64 bg-popover border border-border rounded-md shadow-modal animate-slide-down z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                {user?.name ? (
                  <span className="text-sm font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                ) : (
                  <Icon name="User" size={18} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-popover-foreground truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className="flex items-start space-x-3 px-4 py-3 text-sm text-popover-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
                onClick={() => setIsOpen(false)}
              >
                <Icon name={item?.icon} size={16} className="mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item?.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {item?.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-left text-popover-foreground hover:text-destructive hover:bg-destructive/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
            >
              <Icon name="LogOut" size={16} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountMenu;