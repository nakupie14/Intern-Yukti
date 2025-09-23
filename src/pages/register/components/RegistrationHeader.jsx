import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getLocalizedContent = () => {
    const content = {
      en: {
        title: 'Create Your Account',
        subtitle: 'Join thousands of students finding their perfect internships',
        loginText: 'Already have an account?',
        loginLink: 'Sign in here'
      },
      hi: {
        title: 'अपना खाता बनाएं',
        subtitle: 'हजारों छात्रों के साथ जुड़ें जो अपनी परफेक्ट इंटर्नशिप खोज रहे हैं',
        loginText: 'पहले से खाता है?',
        loginLink: 'यहाँ साइन इन करें'
      },
      ta: {
        title: 'உங்கள் கணக்கை உருவாக்கவும்',
        subtitle: 'தங்களின் சரியான இன்டர்ன்ஷிப்பைக் கண்டறியும் ஆயிரக்கணக்கான மாணவர்களுடன் சேரவும்',
        loginText: 'ஏற்கனவே கணக்கு உள்ளதா?',
        loginLink: 'இங்கே உள்நுழையவும்'
      }
    };

    return content?.[currentLanguage] || content?.en;
  };

  const localizedContent = getLocalizedContent();

  return (
    <div className="text-center space-y-6">
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
      {/* Header Content */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {localizedContent?.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          {localizedContent?.subtitle}
        </p>
      </div>
      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="flex flex-col items-center space-y-2 p-4 bg-primary/5 rounded-lg">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Target" size={20} className="text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">
            Personalized Matches
          </span>
        </div>

        <div className="flex flex-col items-center space-y-2 p-4 bg-secondary/5 rounded-lg">
          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
            <Icon name="Bookmark" size={20} className="text-secondary" />
          </div>
          <span className="text-sm font-medium text-foreground">
            Save Favorites
          </span>
        </div>

        <div className="flex flex-col items-center space-y-2 p-4 bg-accent/5 rounded-lg">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-accent" />
          </div>
          <span className="text-sm font-medium text-foreground">
            Get Notifications
          </span>
        </div>
      </div>
      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {localizedContent?.loginText}{' '}
          <Link 
            to="/login" 
            className="font-medium text-primary hover:text-primary/80 transition-colors duration-200"
          >
            {localizedContent?.loginLink}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationHeader;