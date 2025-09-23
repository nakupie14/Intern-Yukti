import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showIndicator, setShowIndicator] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const content = {
    en: {
      online: "You\'re online",
      offline: "You\'re offline",
      offlineMessage: "Don\'t worry! Your progress is saved locally and will sync when you\'re back online.",
      onlineMessage: "All features are available"
    },
    hi: {
      online: "आप ऑनलाइन हैं",
      offline: "आप ऑफलाइन हैं",
      offlineMessage: "चिंता न करें! आपकी प्रगति स्थानीय रूप से सहेजी गई है और जब आप वापस ऑनलाइन होंगे तो सिंक हो जाएगी।",
      onlineMessage: "सभी सुविधाएं उपलब्ध हैं"
    },
    ta: {
      online: "நீங்கள் ஆன்லைனில் உள்ளீர்கள்",
      offline: "நீங்கள் ஆஃப்லைனில் உள்ளீர்கள்",
      offlineMessage: "கவலைப்பட வேண்டாம்! உங்கள் முன்னேற்றம் உள்ளூரில் சேமிக்கப்பட்டுள்ளது மற்றும் நீங்கள் மீண்டும் ஆன்லைனில் வரும்போது ஒத்திசைக்கப்படும்.",
      onlineMessage: "அனைத்து அம்சங்களும் கிடைக்கின்றன"
    },
    te: {
      online: "మీరు ఆన్‌లైన్‌లో ఉన్నారు",
      offline: "మీరు ఆఫ్‌లైన్‌లో ఉన్నారు",
      offlineMessage: "చింతించకండి! మీ పురోగతి స్థానికంగా సేవ్ చేయబడింది మరియు మీరు తిరిగి ఆన్‌లైన్‌లో ఉన్నప్పుడు సింక్ అవుతుంది.",
      onlineMessage: "అన్ని ఫీచర్లు అందుబాటులో ఉన్నాయి"
    },
    bn: {
      online: "আপনি অনলাইনে আছেন",
      offline: "আপনি অফলাইনে আছেন",
      offlineMessage: "চিন্তা করবেন না! আপনার অগ্রগতি স্থানীয়ভাবে সংরক্ষিত এবং আপনি আবার অনলাইনে এলে সিঙ্ক হবে।",
      onlineMessage: "সব ফিচার উপলব্ধ"
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Show indicator initially if offline
    if (!navigator.onLine) {
      setShowIndicator(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const currentContent = content?.[currentLanguage] || content?.en;

  if (!showIndicator && isOnline) return null;

  return (
    <div className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
      showIndicator ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg border ${
        isOnline 
          ? 'bg-success text-success-foreground border-success/20' 
          : 'bg-warning text-warning-foreground border-warning/20'
      } animate-slide-down`}>
        <div className="flex-shrink-0">
          {isOnline ? (
            <Icon name="Wifi" size={20} />
          ) : (
            <Icon name="WifiOff" size={20} />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">
            {isOnline ? currentContent?.online : currentContent?.offline}
          </p>
          <p className="text-xs opacity-90 mt-1">
            {isOnline ? currentContent?.onlineMessage : currentContent?.offlineMessage}
          </p>
        </div>

        {!isOnline && (
          <button
            onClick={() => setShowIndicator(false)}
            className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors duration-200"
            aria-label="Close notification"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default OfflineIndicator;