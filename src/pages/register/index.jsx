import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import VoiceInputHelper from './components/VoiceInputHelper';

const Register = () => {
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showVoiceHelper, setShowVoiceHelper] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Handle any state messages from navigation
    if (location?.state?.message) {
      setNotification({
        message: location?.state?.message,
        type: location?.state?.type || 'info'
      });
      
      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, [location?.state]);

  const handleVoiceResult = (transcript) => {
    // This would be passed to the form to fill the current field
    console.log('Voice input received:', transcript);
    
    // Dispatch custom event with voice result
    window.dispatchEvent(new CustomEvent('voiceInputResult', {
      detail: { transcript, field: currentField }
    }));
  };

  const handleFieldFocus = (fieldName) => {
    setCurrentField(fieldName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-modal animate-slide-down ${
          notification?.type === 'success' ? 'bg-success text-success-foreground' :
          notification?.type === 'error' ? 'bg-error text-error-foreground' :
          'bg-primary text-primary-foreground'
        }`}>
          <p className="text-sm font-medium">{notification?.message}</p>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Header & Info */}
            <div className="space-y-8">
              <RegistrationHeader />
              
              {/* Features Highlight */}
              <div className="hidden lg:block space-y-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Why Choose InternYukti?
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">AI</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">AI-Powered Matching</h4>
                      <p className="text-sm text-muted-foreground">
                        Our advanced AI analyzes your profile to find the most relevant internship opportunities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-secondary font-bold text-sm">🌍</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Multi-Language Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Access the platform in your preferred language with support for 10+ Indian languages.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold text-sm">♿</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Accessible Design</h4>
                      <p className="text-sm text-muted-foreground">
                        Voice input, screen reader support, and inclusive design for all users.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-lg shadow-modal p-6 lg:p-8">
                <RegistrationForm onFieldFocus={handleFieldFocus} />
              </div>

              {/* Social Registration */}
              <div className="bg-card border border-border rounded-lg shadow-modal p-6 lg:p-8">
                <SocialRegistration />
              </div>

              {/* Voice Input Helper */}
              {showVoiceHelper && (
                <div className="bg-card border border-border rounded-lg shadow-modal p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Voice Input Assistant
                  </h3>
                  <VoiceInputHelper
                    onVoiceResult={handleVoiceResult}
                    currentField={currentField}
                  />
                </div>
              )}

              {/* Voice Input Toggle */}
              <div className="text-center">
                <button
                  onClick={() => setShowVoiceHelper(!showVoiceHelper)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                >
                  {showVoiceHelper ? 'Hide Voice Assistant' : 'Need Voice Input Help?'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date()?.getFullYear()} InternYukti. All rights reserved. |{' '}
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a> |{' '}
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a> |{' '}
              <a href="#" className="hover:text-primary transition-colors">Help Center</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;