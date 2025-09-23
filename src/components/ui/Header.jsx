import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' }
  ];

  const navigationItems = [
    { 
      label: 'Home', 
      path: '/landing-page',
      icon: 'Home'
    },
    { 
      label: 'Get Recommendations', 
      path: '/questionnaire-flow',
      icon: 'Target',
      subItems: [
        { label: 'Questionnaire', path: '/questionnaire-flow', icon: 'FileText' },
        { label: 'Resume Upload', path: '/resume-upload', icon: 'Upload' }
      ]
    },
    { 
      label: 'My Results', 
      path: '/internship-results',
      icon: 'TrendingUp'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('language', languageCode);
    setIsLanguageDropdownOpen(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setIsAccountMenuOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setIsAccountMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const currentLanguageData = languages?.find(lang => lang?.code === currentLanguage);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/landing-page" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-bold text-foreground">InternYukti</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <Link
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActiveRoute(item?.path)
                      ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                  {item?.subItems && (
                    <Icon name="ChevronDown" size={14} className="ml-1" />
                  )}
                </Link>

                {/* Dropdown for Get Recommendations */}
                {item?.subItems && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      {item?.subItems?.map((subItem) => (
                        <Link
                          key={subItem?.path}
                          to={subItem?.path}
                          className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors duration-200 ${
                            isActiveRoute(subItem?.path)
                              ? 'text-primary bg-primary/10' :'text-popover-foreground hover:text-primary hover:bg-primary/5'
                          }`}
                        >
                          <Icon name={subItem?.icon} size={14} />
                          <span>{subItem?.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
              >
                <span>{currentLanguageData?.flag}</span>
                <span className="hidden sm:inline">{currentLanguageData?.name}</span>
                <Icon name="ChevronDown" size={14} />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-popover border border-border rounded-md shadow-modal animate-slide-down">
                  <div className="py-1">
                    {languages?.map((language) => (
                      <button
                        key={language?.code}
                        onClick={() => handleLanguageChange(language?.code)}
                        className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left transition-colors duration-200 ${
                          currentLanguage === language?.code
                            ? 'text-primary bg-primary/10' :'text-popover-foreground hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        <span>{language?.flag}</span>
                        <span>{language?.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Account Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                  >
                    <Icon name="User" size={16} />
                    <span className="hidden sm:inline">Account</span>
                    <Icon name="ChevronDown" size={14} />
                  </button>

                  {isAccountMenuOpen && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-modal animate-slide-down">
                      <div className="py-1">
                        <Link
                          to="/internship-results"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          <Icon name="Bookmark" size={14} />
                          <span>Saved Internships</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-left text-popover-foreground hover:text-destructive hover:bg-destructive/5 transition-colors duration-200"
                        >
                          <Icon name="LogOut" size={14} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="default" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => (
                <div key={item?.path}>
                  <Link
                    to={item?.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActiveRoute(item?.path)
                        ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                  
                  {/* Mobile Sub Items */}
                  {item?.subItems && (
                    <div className="ml-6 space-y-1">
                      {item?.subItems?.map((subItem) => (
                        <Link
                          key={subItem?.path}
                          to={subItem?.path}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                            isActiveRoute(subItem?.path)
                              ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-primary hover:bg-primary/5'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Icon name={subItem?.icon} size={14} />
                          <span>{subItem?.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Account Actions */}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-border space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;