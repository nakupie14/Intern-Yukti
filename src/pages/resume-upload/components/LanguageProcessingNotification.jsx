import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageProcessingNotification = ({ 
  detectedLanguage, 
  isVisible, 
  onClose, 
  className = '' 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const languageMap = {
    'hi': { name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
    'ta': { name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' },
    'mr': { name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
    'te': { name: 'Telugu', flag: '🇮🇳', nativeName: 'తెలుగు' },
    'bn': { name: 'Bengali', flag: '🇮🇳', nativeName: 'বাংলা' },
    'gu': { name: 'Gujarati', flag: '🇮🇳', nativeName: 'ગુજરાતી' },
    'kn': { name: 'Kannada', flag: '🇮🇳', nativeName: 'ಕನ್ನಡ' },
    'en': { name: 'English', flag: '🇺🇸', nativeName: 'English' }
  };

  const language = languageMap?.[detectedLanguage] || languageMap?.['en'];

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <div className={`bg-card border border-border rounded-lg shadow-modal p-4 max-w-sm transition-all duration-300 ${
        isAnimating ? 'animate-slide-down opacity-100' : 'opacity-0 translate-y-[-10px]'
      }`}>
        <div className="flex items-start space-x-3">
          {/* Language Icon */}
          <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="Languages" size={20} className="text-accent" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-lg">{language?.flag}</span>
              <h4 className="text-sm font-semibold text-card-foreground">
                Language Detected
              </h4>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              {detectedLanguage === 'en' 
                ? `Resume is in ${language?.name}. Processing directly.`
                : `Resume is in ${language?.nativeName} (${language?.name}). Auto-translating for analysis.`
              }
            </p>

            {detectedLanguage !== 'en' && (
              <div className="flex items-center space-x-2 text-xs text-accent">
                <Icon name="Zap" size={12} />
                <span>AI Translation in progress...</span>
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Close notification"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Progress Indicator for Translation */}
        {detectedLanguage !== 'en' && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {language?.nativeName} → English
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1">
              <div className="bg-accent h-1 rounded-full animate-pulse" style={{ width: '70%' }} />
            </div>
          </div>
        )}

        {/* Features Highlight */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-success">
            <Icon name="CheckCircle" size={12} />
            <span>Multi-language support enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageProcessingNotification;