import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';

const LanguageSwitcher = ({ className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', flag: '🇮🇳', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languages?.find(lang => lang?.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
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

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('language', languageCode);
    setIsOpen(false);
    
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language: languageCode } 
    }));
  };

  const currentLanguageData = languages?.find(lang => lang?.code === currentLanguage);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 min-h-touch min-w-touch rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base" role="img" aria-label={currentLanguageData?.name}>
          {currentLanguageData?.flag}
        </span>
        <span className="hidden sm:inline font-medium">
          {currentLanguageData?.nativeName}
        </span>
        <Icon 
          name="ChevronDown" 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-modal animate-slide-down z-50">
          <div className="py-1 max-h-64 overflow-y-auto" role="listbox">
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageChange(language?.code)}
                className={`flex items-center space-x-3 w-full px-4 py-2 min-h-touch text-sm text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset ${
                  currentLanguage === language?.code
                    ? 'text-primary bg-primary/10 font-medium' :'text-popover-foreground hover:text-primary hover:bg-primary/5'
                }`}
                role="option"
                aria-selected={currentLanguage === language?.code}
              >
                <span className="text-base" role="img" aria-label={language?.name}>
                  {language?.flag}
                </span>
                <div className="flex flex-col">
                  <span className="font-medium">{language?.nativeName}</span>
                  <span className="text-xs text-muted-foreground">{language?.name}</span>
                </div>
                {currentLanguage === language?.code && (
                  <Icon name="Check" size={14} className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;