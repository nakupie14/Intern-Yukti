import React, { useState, useEffect, useRef } from 'react';

import Button from './Button';

const VoiceInputToggle = ({ 
  onVoiceResult, 
  onVoiceStart, 
  onVoiceEnd, 
  className = '',
  size = 'default',
  position = 'fixed' // 'fixed' or 'inline'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef?.current;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = localStorage.getItem('language') || 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        onVoiceStart?.();
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event?.results)?.map(result => result?.[0])?.map(result => result?.transcript)?.join('');

        if (event?.results?.[0]?.isFinal) {
          onVoiceResult?.(transcript);
        }
      };

      recognition.onerror = (event) => {
        setError(event?.error);
        setIsListening(false);
        onVoiceEnd?.();
      };

      recognition.onend = () => {
        setIsListening(false);
        onVoiceEnd?.();
      };
    }

    // Update language when it changes
    const handleLanguageChange = (event) => {
      if (recognitionRef?.current) {
        const languageMap = {
          'en': 'en-US',
          'hi': 'hi-IN',
          'ta': 'ta-IN',
          'te': 'te-IN',
          'bn': 'bn-IN',
          'mr': 'mr-IN',
          'gu': 'gu-IN',
          'kn': 'kn-IN'
        };
        
        recognitionRef.current.lang = languageMap?.[event?.detail?.language] || 'en-US';
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      if (recognitionRef?.current) {
        recognitionRef?.current?.abort();
      }
      if (timeoutRef?.current) {
        clearTimeout(timeoutRef?.current);
      }
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, [onVoiceResult, onVoiceStart, onVoiceEnd]);

  const startListening = () => {
    if (!isSupported || !recognitionRef?.current) return;

    try {
      recognitionRef?.current?.start();
      
      // Auto-stop after 10 seconds
      timeoutRef.current = setTimeout(() => {
        if (recognitionRef?.current && isListening) {
          recognitionRef?.current?.stop();
        }
      }, 10000);
    } catch (error) {
      setError('Failed to start voice recognition');
    }
  };

  const stopListening = () => {
    if (recognitionRef?.current && isListening) {
      recognitionRef?.current?.stop();
    }
    if (timeoutRef?.current) {
      clearTimeout(timeoutRef?.current);
    }
  };

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  const buttonContent = (
    <Button
      variant={isListening ? "default" : "outline"}
      size={size}
      onClick={handleToggle}
      disabled={!!error}
      className={`${isListening ? 'animate-pulse' : ''} ${className}`}
      iconName={isListening ? "MicOff" : "Mic"}
      iconPosition="left"
      aria-label={isListening ? "Stop voice input" : "Start voice input"}
      title={error || (isListening ? "Click to stop listening" : "Click to start voice input")}
    >
      {isListening ? "Listening..." : "Voice Input"}
    </Button>
  );

  if (position === 'fixed') {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        {buttonContent}
        {error && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-error text-error-foreground text-sm rounded-md shadow-modal animate-slide-up">
            Voice input error: {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {buttonContent}
      {error && (
        <div className="absolute top-full left-0 mt-1 px-3 py-2 bg-error text-error-foreground text-sm rounded-md shadow-modal animate-slide-down">
          Voice input error: {error}
        </div>
      )}
    </div>
  );
};

export default VoiceInputToggle;