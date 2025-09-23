import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import VoiceInputToggle from '../../../components/ui/VoiceInputToggle';

const VoiceInputFAB = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const content = {
    en: {
      tooltip: "Try voice input! Say \'Start questionnaire\' or \'Upload resume'",
      voiceCommands: {
        questionnaire: ['start questionnaire', 'begin questionnaire', 'questionnaire'],
        resume: ['upload resume', 'resume upload', 'upload my resume']
      }
    },
    hi: {
      tooltip: "वॉयस इनपुट आज़माएं! \'प्रश्नावली शुरू करें\' या \'रिज्यूमे अपलोड करें\' कहें",
      voiceCommands: {
        questionnaire: ['प्रश्नावली शुरू करें', 'प्रश्नावली शुरू', 'questionnaire'],
        resume: ['रिज्यूमे अपलोड करें', 'resume upload', 'रिज्यूमे अपलोड']
      }
    },
    ta: {
      tooltip: "குரல் உள்ளீட்டை முயற்சிக்கவும்! \'கேள்வித்தாளைத் தொடங்கவும்\' அல்லது \'ரெஸ்யூமே பதிவேற்றவும்\' என்று சொல்லுங்கள்",
      voiceCommands: {
        questionnaire: ['கேள்வித்தாளைத் தொடங்கவும்', 'questionnaire start', 'questionnaire'],
        resume: ['ரெஸ்யூமே பதிவேற்றவும்', 'resume upload', 'upload resume']
      }
    },
    te: {
      tooltip: "వాయిస్ ఇన్‌పుట్‌ను ప్రయత్నించండి! \'ప్రశ్నావళిని ప్రారంభించండి\' లేదా \'రెజ్యూమ్ అప్‌లోడ్ చేయండి\' అని చెప్పండి",
      voiceCommands: {
        questionnaire: ['ప్రశ్నావళిని ప్రారంభించండి', 'questionnaire start', 'questionnaire'],
        resume: ['రెజ్యూమ్ అప్‌లోడ్ చేయండి', 'resume upload', 'upload resume']
      }
    },
    bn: {
      tooltip: "ভয়েস ইনপুট চেষ্টা করুন! \'প্রশ্নাবলী শুরু করুন\' বা \'রেজিউমে আপলোড করুন\' বলুন",
      voiceCommands: {
        questionnaire: ['প্রশ্নাবলী শুরু করুন', 'questionnaire start', 'questionnaire'],
        resume: ['রেজিউমে আপলোড করুন', 'resume upload', 'upload resume']
      }
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
    // Show tooltip after 3 seconds if user hasn't interacted
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleVoiceResult = (transcript) => {
    const lowerTranscript = transcript?.toLowerCase();
    const currentContent = content?.[currentLanguage] || content?.en;
    
    // Check for questionnaire commands
    const questionnaireMatch = currentContent?.voiceCommands?.questionnaire?.some(cmd => 
      lowerTranscript?.includes(cmd?.toLowerCase())
    );
    
    // Check for resume commands
    const resumeMatch = currentContent?.voiceCommands?.resume?.some(cmd => 
      lowerTranscript?.includes(cmd?.toLowerCase())
    );

    if (questionnaireMatch) {
      window.location.href = '/questionnaire-flow';
    } else if (resumeMatch) {
      window.location.href = '/resume-upload';
    } else {
      // Show available commands
      const availableCommands = [
        ...currentContent?.voiceCommands?.questionnaire,
        ...currentContent?.voiceCommands?.resume
      ]?.join(', ');
      
      console.log(`Available voice commands: ${availableCommands}`);
    }
  };

  const handleVoiceStart = () => {
    setHasInteracted(true);
    setShowTooltip(false);
  };

  // Add this block - handler for when voice input ends
  const handleVoiceEnd = () => {
    // Optional: Add any cleanup or state updates needed when voice input ends
  };

  const currentContent = content?.[currentLanguage] || content?.en;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-4 w-64 bg-popover text-popover-foreground p-3 rounded-lg shadow-modal border border-border animate-slide-up">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-sm">{currentContent?.tooltip}</p>
          </div>
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-popover border-r border-b border-border"></div>
        </div>
      )}
      {/* Voice Input FAB */}
      <div className="relative">
        <VoiceInputToggle
          onVoiceResult={handleVoiceResult}
          onVoiceStart={handleVoiceStart}
          onVoiceEnd={handleVoiceEnd}
          position="inline"
          size="lg"
          className="shadow-lg hover:shadow-xl transition-shadow duration-300"
        />
        
        {/* Pulse animation for first-time users */}
        {!hasInteracted && (
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
        )}
      </div>
    </div>
  );
};

export default VoiceInputFAB;